// import React from 'react'
// import * as MaterialModal from '@material-ui/core/Modal';
import Modal from "@material-ui/core/Modal";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import useModal from "@hooks/useModal";

import LocalCafeIcon from "@material-ui/icons/LocalCafe";

function CustomModal() {
  const { isOpened, decline, confirm, title } = useModal();

  return (
    <Modal
      open={isOpened}
      onClose={decline}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: "32rem", borderRadius: "10px" }}>
        <CardContent
          style={{
            display: "flex",
            alignItems: "center",
            textAlign: "left",
            padding: "2.5rem 0rem 1.5rem 2.5rem",
            marginBottom: "-10px",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          {/* <ContactSupportIcon /> */}
          <LocalCafeIcon
            style={{ fontSize: "2rem", color: "#e83e8c", marginRight: "10px" }}
          />
          알림
        </CardContent>

        <CardContent
          style={{
            // textAlign: "center",
            fontSize: "1.2rem",
            padding: "1.5rem 1.5rem 1.0rem 2.5rem",
            whiteSpace: "pre",
          }}
        >{`${title}`}</CardContent>
        <CardActions
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingBottom: "1rem",
          }}
        >
          <Button
            variant='outlined'
            style={{
              fontSize: "1.2rem",
              border: "1px solid #e83e8c",
              margin: "1.2rem",
            }}
            onClick={decline}
          >
            취소
          </Button>
          <Button
            variant='contained'
            // color='secondary'
            style={{
              fontSize: "1.2rem",
              background: "#e83e8c",
              color: "white",
              margin: "1rem",
            }}
            onClick={confirm}
          >
            확인
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}

export default CustomModal;
