import React from 'react';
import {
    Form,
    Input,
    Tooltip,
    Button,
} from 'antd';
import { registerUser } from '../_Redux/_Auth/Actions';
import { useDispatch } from 'react-redux';
import { QuestionCircleOutlined } from '@ant-design/icons';

export const Register = (props) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const onFinish = values => {
        dispatch(registerUser(values.username, values.email, values.password))
    };
    return (
        <div style={{ maxWidth: "300px", margin: "auto", marginTop: "10%" }}>
            <h1>S'inscrire</h1>
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="username"
                    label={
                        <span>
                            Username&nbsp;
                <Tooltip title="What do you want others to call you?">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                    rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        S'inscrire
            </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
