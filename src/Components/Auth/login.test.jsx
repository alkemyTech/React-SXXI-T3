import { MemoryRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import { render, screen, wrapper } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import store from "../../app/store";

import Login from "./Login";

const mokedResponse = {
    "success": true,
    "data": {
        "user": {
            "id": 4124,
            "name": "user Name",
            "email": "fakeuser@mail.com",
            "email_verified_at": null,
            "password": "$2y$10$zKtj.I.PQluDL/887lizKOwoF1e2p5vi2R83AQNCJAjRBFZgkezYS",
            "role_id": 1,
            "remember_token": null,
            "created_at": "2022-12-01T23:01:42.000000Z",
            "updated_at": "2022-12-01T23:01:42.000000Z",
            "deleted_at": null,
            "group_id": null,
            "latitude": null,
            "longitude": null,
            "address": null,
            "profile_image": null
        },
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvb25nYXBpLmFsa2VteS5vcmdcL2FwaVwvbG9naW4iLCJpYXQiOjE2NzEwNDc3MjEsImV4cCI6MTY3MTA1MTMyMSwibmJmIjoxNjcxMDQ3NzIxLCJqdGkiOiI2b1VMS1ZyMkF4NXdUdzl4Iiwic3ViIjo0MTI0LCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.Qwk8zUtzulLQOculyi-NjRn8D2_C-UDxxaVONGfk-1g"
    },
    "message": "user login okey"
}

const apiLogin = "https://ongapi.alkemy.org/api/login";

const server = setupServer(
    rest.post(apiLogin,
        (req, res, ctx) => {
            return res(ctx.json(mokedResponse));
        })
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Formulario de Login', () => {
    it('Debe mostrar errores en los campos intentar eviar el formulario vacío', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<div>Test Success</div>} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )

        userEvent.click(screen.getByRole("button", { name: "Inicia sesión" }));

        const errors = await screen.findAllByTestId("errorContainer");
        expect(errors.length).toBe(2);

    })

    it("Debería mostrar un mensaje en caso de enviar credenciales inválidas", async () => {
        server.use(
            rest.post(apiLogin, (req, res, ctx) => {
                return res(ctx.status(200), ctx.json({
                    "error": "No token"
                }))
            }),
        )
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<div>Test Success</div>} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )

        userEvent.type(
            screen.getByTestId("email"),
            "EmailIncorrecto@mail.com"
        );
        userEvent.type(
            screen.getByTestId('password'),
            "PasswordIncorrecto!123"
        );

        userEvent.click(screen.getByRole("button", { name: "Inicia sesión" }));

        const alert = await screen.findByText('Email o contraseña invalidos');
        expect(alert).toBeInTheDocument();
    })

    it("Manejo correcto de errores de red", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<div>Test Success</div>} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )
        server.use(
            rest.post(apiLogin, (req, res, ctx) => {
                return res(ctx.status(500), ctx.json({
                    "name": "AxiosError",
                    "message": "Network Error",
                    "stack": "AxiosError: Network Error\n    at XMLHttpRequest.handleError (http://localhost:3000/static/js/bundle.js:132180:14)",
                    "code": "ERR_NETWORK"
                }))
            }),
        )

        userEvent.type(
            screen.getByTestId("email"),
            "fakeuser@mail.com"
        );
        userEvent.type(
            screen.getByTestId('password'),
            "123qwe!"
        );

        userEvent.click(screen.getByRole("button", { name: "Inicia sesión" }));
        const alert = await screen.findByText('Hay problemas con la red, revisa tu conexion a internet');

        expect(alert).toBeInTheDocument();
    })

    it('Debe redirigir al home al enviar el formulario con credenciales válidas', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="/login" exact element={<Login />} />
                        <Route path="/" element={<div>Test Success</div>} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )

        userEvent.type(
            screen.getByTestId("email"),
            "fakeuser@mail.com"
        );
        userEvent.type(
            screen.getByTestId('password'),
            "123qwe!"
        );
        userEvent.click(screen.getByRole("button", { name: "Inicia sesión" }));

        expect(await screen.findByText("Test Success")).toBeInTheDocument();
    })

})
