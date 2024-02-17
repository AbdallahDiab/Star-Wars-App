import { Avatar, Card, Modal } from "antd";
import React, { useState } from "react";
import CharacterDetails from "./CharacterDetails";

export default function UserCard({ userData, loading }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {" "}
      <Card loading={loading} hoverable onClick={() => setOpen(true)}>
        <Avatar
          shape="square"
          size={64}
          src={`https://picsum.photos/200/300?random=${userData?.name}`}
        />

        <h3>{userData.name}</h3>
      </Card>
      <Modal
        title={userData?.name}
        centered
        open={open}
        destroyOnClose
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <CharacterDetails onClose={() => setOpen(false)} data={userData} />
      </Modal>
    </>
  );
}
