import React, { useState } from 'react'
import { Tabs, Form, message } from 'antd'
import { Overlay, Button, Input, Space, Card, FlexCenter, Text } from '@components/custom';
import { colors } from '@themes';
import FeatherIcon from 'feather-icons-react';
import GoogleIcon from "@assets/googleIcon.svg";
const { TabPane } = Tabs;
function AuthOverlay({ userProps, setShowAuth }) {
    const [loginForm] = Form.useForm();
    const [signupForm] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const handleLogin = async () => {
        const { email, password } = loginForm.getFieldValue();
        try {
            if(!email || !password) {
                throw new Error("Please Fill Fields")
            }
            if(email.length > 50) {
                throw new Error("Email length cannot be greater than 50")
            }
            if(password.length > 50) {
                throw new Error("Password length cannot be greater than 50")
            }
            setLoading(true)
            await userProps.handleEmailLogin(email.trim(), password.trim());
            setLoading(false)
            message.success(<strong>Signed In Successfully</strong>);
        } catch (err) {
            setLoading(false);
            message.error(<strong>{err.message}</strong>);
        }
    };
    const handleSignup = async () => {
        const { name, email, password } = signupForm.getFieldValue();
        try {
            if(!name || !email || !password) {
                throw new Error("Please Fill Fields")
            }
            if(name.length > 50) {
                throw new Error("Name length cannot be greater than 50")
            }
            if(email.length > 50) {
                throw new Error("Email length cannot be greater than 50")
            }
            if(password.length > 50) {
                throw new Error("Password length cannot be greater than 50")
            }
            setLoading(true)
            await userProps.handleEmailSignup(name, email.trim(), password.trim());
            setLoading(false)
            message.success(<strong>Registered Successfully</strong>);
        } catch (err) {
            setLoading(false)
            message.error(<strong>{err.message}</strong>);
        }
    };
    return (
        <Overlay>
            <Card style={{ maxWidth: 500, width: '100%', position: 'relative' }}>
                <div onClick={e => setShowAuth(false)} style={{ cursor: 'pointer', position: 'absolute', top: '10px', right: '20px'}} >
                    <FeatherIcon icon="x" />
                </div>
                <Tabs defaultActiveKey="1">
                    <TabPane disabled={loading} tab={<strong>Login</strong>} key="1">
                        <Form
                            requiredMark={false}
                            name="login"
                            form={loginForm}
                            onFinish={handleLogin}
                            layout="vertical"
                            initialValues={{ remember: true }}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                            >
                                <Input  />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                            >
                                <Input type="password" />
                            </Form.Item>

                            <Space top="2em" />
                            <Button disabled={loading} style={{ width: "100%" }} type="primary">
                                Login
                            </Button>
                        </Form>
                        <Space top="1em" />
                        <Button
                            onClick={userProps.signIn}
                            style={{
                                width: "100%",
                                backgroundColor: `${colors.white}`,
                                border: `1px solid ${colors.grey}`,
                            }}
                            disabled={loading}
                        >
                            <FlexCenter>
                                <img
                                    style={{ height: "1.2rem", width: "1.2rem" }}
                                    src={GoogleIcon}
                                />
                                <Text style={{ marginLeft: "1rem" }}>Google</Text>
                            </FlexCenter>
                        </Button>
                    </TabPane>
                    <TabPane disabled={loading} tab={<strong>Signup</strong>} key="2">
                        <Form
                            requiredMark={false}
                            form={signupForm}
                            onFinish={handleSignup}
                            name="signup"
                            layout="vertical"
                            initialValues={{ remember: true }}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                
                            >
                                <Input type="password" />
                            </Form.Item>

                            <Space top="2em" />
                            <Button

                                style={{ width: "100%" }}
                                type="primary"
                            >
                                Signup
                            </Button>
                        </Form>
                        <Space top="1em" />
                        <Button
                            onClick={userProps.signIn}
                            style={{
                                width: "100%",
                                backgroundColor: `${colors.white}`,
                                border: `1px solid ${colors.grey}`,
                            }}
                        >
                            <FlexCenter>
                                <img
                                    style={{ height: "1.2rem", width: "1.2rem" }}
                                    src={GoogleIcon}
                                />
                                <Text style={{ marginLeft: "1rem" }}>Google</Text>
                            </FlexCenter>
                        </Button>
                    </TabPane>
                </Tabs>
            </Card>
        </Overlay>
    )
}

export default AuthOverlay
