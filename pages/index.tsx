/* eslint-disable @next/next/no-img-element */
import Layout from "src/layouts";
import FreeBreakfastIcon from "@material-ui/icons/FreeBreakfast";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { connectToDatabase } from "@lib/mongodb";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useRef, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import parser from "ua-parser-js";

import Loading from "@svgs/Loading";
import * as S from "@styles/Home.style";
import useModal from "@hooks/useModal";

interface Props {
  coffees: {
    _id: number | string;
    name: string;
    // date: string;
  }[];
}

export default function Home({ coffees }: Props) {
  const [menu, setMenu] = useState("");
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  const [addedMenu, setAddedMenu] = useState("");
  const target = useRef<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { openCustomModal } = useModal();

  useEffect(() => {
    if (!menu) return;
    setIsLoading(false);
    openCustomModal(`주문이 완료되었습니다.\n\n-${menu} `);
    router.push("/orders");
    setMenu("");
  }, [menu]);

  useEffect(() => {
    if (!addedMenu) return;
    try {
      setEditMode(false);
      setIsLoading(true);
      axios
        .post("/api/db/insertOneToMongo", {
          payload: {
            name: addedMenu,
          },
          collection: "coffees",
        })
        .then(() => {
          setIsLoading(false);
          openCustomModal(`${addedMenu} - 메뉴에 추가되었습니다.`);
          // alert(`${addedMenu} - 메뉴에 추가되었습니다.`);
          setAddedMenu("");
          router.reload();
        });
    } catch (error) {
      console.error(error);
    }
  }, [addedMenu]);

  return (
    <Layout>
      <S.Container>
        <S.Title>
          <h1>{`Welcome\nDrink`}</h1>
          <strong>메뉴를 터치해주세요</strong>
        </S.Title>
        {isLoading && <Loading />}

        <S.MenuWrapper>
          <img src='/images/elegant_top.png' alt='cover' />
          <S.Menus>
            {coffees.map((coffee, idx) => (
              <>
                <li
                  style={{ cursor: "pointer", listStyle: "none" }}
                  key={coffee._id}
                  value={coffee.name}
                >
                  <span
                    ref={(el) => {
                      if (!el) return;
                      target.current[idx] = el?.innerText;
                    }}
                    onClick={async (e) => {
                      const selectedMenu = e.currentTarget.innerText;
                      const isConfirmed = await openCustomModal(
                        `"${selectedMenu}"로 하실래요?`
                      );

                      if (isConfirmed) {
                        const device_model = parser(window.navigator.userAgent)
                          .device.model;

                        try {
                          setIsLoading(true);
                          axios
                            .post("/api/db/insertOneToMongo", {
                              collection: "orders",
                              payload: {
                                name: selectedMenu,
                                date: new Date().toLocaleString(),
                                device_model,
                              },
                            })
                            .then((res) => {
                              setMenu(res.data.name);
                            });
                          axios.post("/api/db/sendSMS", {
                            payload: {
                              name: selectedMenu,
                              device_model,
                            },
                          });
                        } catch (error) {
                          console.error(error);
                        }
                      }
                    }}
                  >
                    {coffee.name}
                  </span>
                  {editMode && (
                    <DeleteForeverIcon
                      onClick={() => {
                        const willDeletedMenu = target.current[idx];
                        if (
                          confirm(
                            `${willDeletedMenu} - 메뉴에서 삭제하시겠습니까?`
                          )
                        ) {
                          try {
                            setEditMode(false);
                            setIsLoading(true);
                            axios
                              .delete("api/db/deleteOne", {
                                data: {
                                  collection: "coffees",
                                  payload: {
                                    name: willDeletedMenu,
                                  },
                                },
                              })
                              .then(() => {
                                alert(
                                  `${willDeletedMenu} - 메뉴에서 삭제되었습니다.`
                                );
                                setIsLoading(false);
                                router.reload();
                              });
                          } catch (error) {
                            console.error(error);
                          }
                        }
                      }}
                      style={{ color: "#e83e8c" }}
                    />
                  )}
                </li>
              </>
            ))}

            {editMode && (
              <AddIcon
                style={{ color: "gray", fontSize: "4rem" }}
                onClick={() => {
                  const newMenu = prompt("메뉴 이름을 적어주세요.");
                  if (!newMenu) return;
                  setAddedMenu(newMenu);
                }}
              />
            )}
          </S.Menus>

          <img src='/images/elegant_top.png' alt='cover' />
        </S.MenuWrapper>
        <S.BottomIcons>
          <FreeBreakfastIcon
            style={{ color: editMode ? "#e83e8c" : "black" }}
            onClick={() => setEditMode(!editMode)}
          />
          <QueryBuilderIcon onClick={() => router.push("/orders")} />
        </S.BottomIcons>
      </S.Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const coffees = await db
    .collection("coffees")
    .find({})
    .sort({ name: 1 })
    .limit(20)
    .toArray();

  return {
    props: {
      coffees: JSON.parse(JSON.stringify(coffees)),
    },
  };
}
