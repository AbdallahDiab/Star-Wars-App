import { Button, Form, Input, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [fields, setFields] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = (values) => {
    if (values.userName === "test" && values.password === "test") {
      localStorage.setItem(
        "sw-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsInBhc3N3b3JkIjoidGVzdCJ9.3iftXG9EzUuRcsCykNfzF0_HrMW_eGPBCPDAnBla6zs"
      );
      navigate("/home");
    } else {
      notification.error({ message: "Invalid credentials" });
    }
  };
  useEffect(() => {
    form.setFieldsValue({
      userName: "test",
      password: "test",
    });
  }, []);
  return (
    <div className="login">
      <Form layout="vertical" fields={fields} form={form} onFinish={onFinish}>
        <h2>Login</h2>
        <Form.Item
          label="User name"
          name="userName"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
