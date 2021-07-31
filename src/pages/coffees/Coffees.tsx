import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useRef, useState } from "react";
import { connectToDatabase } from "@lib/mongodb";
import parser from "ua-parser-js";

export default function Coffees({ coffees }) {
  const [menu, setMenu] = useState("");
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  const [addedMenu, setAddedMenu] = useState("");
  const target = useRef([]);

  useEffect(() => {
    if (!menu) return;
    alert(`${menu} 주문이 완료되었습니다.`);
    router.push("/orders");
    setMenu("");
  }, [menu]);

  useEffect(() => {
    if (!addedMenu) return;
    axios
      .post("/api/db/insertOneToMongo", {
        payload: {
          name: addedMenu,
        },
        collection: "coffees",
      })
      .then(() => router.reload());
    setAddedMenu("");
  }, [addedMenu]);

  return (
    <>
      <h1>Select Drink</h1>

      <ul>
        {coffees?.map((coffee, idx) => (
          <>
            <li
              style={{ cursor: "pointer", listStyle: "none" }}
              key={coffee._id}
              value={coffee.name}
            >
              <h2
                ref={(el) => (target.current[idx] = el?.innerText)}
                onClick={(e) => {
                  const selectedMenu = e.currentTarget.innerText;
                  if (confirm(`${selectedMenu}로 하실래요?`)) {
                    try {
                      axios
                        .post("/api/db/insertOneToMongo", {
                          payload: {
                            name: selectedMenu,
                            date: new Date().toLocaleString(),
                          },
                          collection: "orders",
                        })
                        .then((res) => {
                          setMenu(res.data.name);
                        });
                    } catch (error) {
                      console.error(error);
                    }
                  }
                }}
              >
                {coffee.name}
              </h2>
            </li>
            {editMode && (
              <h3
                key={coffee._id}
                style={{ color: "red" }}
                onClick={() => {
                  if (
                    confirm(
                      `${target.current[idx]} - 메뉴에서 삭제하시겠습니까?`
                    )
                  ) {
                    try {
                      axios
                        .delete("api/db/deleteOne", {
                          data: {
                            collection: "coffees",
                            payload: {
                              name: target.current[idx],
                            },
                          },
                        })
                        .then(() => router.reload());
                    } catch (error) {
                      console.error(error);
                    }
                  }
                }}
              >
                제거하기
              </h3>
            )}
          </>
        ))}

        {editMode && (
          <h2
            style={{ color: "blue" }}
            onClick={() => {
              const newMenu = prompt("메뉴 이름을 적어주세요.");
              setAddedMenu(newMenu);
            }}
          >
            메뉴 추가하기
          </h2>
        )}
      </ul>

      <button onClick={() => setEditMode(!editMode)}>
        {editMode ? "메뉴수정 완료" : "메뉴 수정하기"}
      </button>
    </>
  );
}

// WHY 얘를 살리면 왜 오류가 날까
// export async function getServerSideProps() {
//   const { db } = await connectToDatabase();

//   const coffees = await db
//     .collection("coffees")
//     .find({})
//     .sort({ name: 1 })
//     // .sort({ metacritic: -1 })
//     .limit(20)
//     .toArray();

//   return {
//     props: {
//       coffees: JSON.parse(JSON.stringify(coffees)),
//     },
//   };
// }
