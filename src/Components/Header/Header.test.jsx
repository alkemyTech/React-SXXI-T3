import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";
import {configureStore} from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import authReducer from "../../features/auth/authSlice";
import {Header} from "./Header";
import {linksArray} from "../../utils/linksArray";


function testLinksExists() {
    for (const link of linksArray) {
        expect(screen.getByText(link.text)).toBeInTheDocument();
    }
}

it('Usuario no logueado puede ver links + botones de iniciar sesion/register ', async () => {
    renderWithProvidersAndRouter(<Header/>)
    testLinksExists();
    expect(screen.getByTestId("loginButton")).toBeInTheDocument();
    expect(screen.getByTestId("registerButton")).toBeInTheDocument();
});

it('Usuario regular logueado puede ver links + dropdown con info + boton de cerrar sesión ', async () => {
    renderWithProvidersAndRouter(<Header/>, {auth: {token: "test", user: {role_id: 2, name: "pep"}}})
    expect(screen.getByTestId("dropdownName")).toHaveTextContent("pep")
    await userEvent.click(screen.getByTestId("dropdownInfoButton"))
    expect(screen.getByTestId("dropdownRole")).toHaveTextContent("Usuario Regular")
    testLinksExists();
    expect(screen.getByTestId("headerDropdown")).toBeInTheDocument();
    expect(screen.getByTestId("dropdownLogoutButton")).toBeInTheDocument();
});

it('Usuario admin logueado puede ver links + dropdown con info + admin links + boton de cerrar sesión ', async () => {
    renderWithProvidersAndRouter(<Header/>, {auth: {token: "test", user: {role_id: 1, name: "pep Admin"}}})
    expect(screen.getByTestId("dropdownName")).toHaveTextContent("pep Admin")
    await userEvent.click(screen.getByTestId("dropdownInfoButton"))
    expect(screen.getByTestId("dropdownRole")).toHaveTextContent("Usuario Administrador")
    testLinksExists();
    expect(screen.getByTestId("headerDropdown")).toBeInTheDocument();
    expect(screen.getByTestId("dropdownLogoutButton")).toBeInTheDocument();
    expect(screen.getByTestId("dropdownAdminButton")).toBeInTheDocument();
    expect(screen.getByTestId("dropdownAdminButton")).toHaveTextContent("Backoffice")
});


// Configura el reducer a usar con estado inicial (preloadedState)
function getStore(preloadedState) {
    return configureStore({
        reducer: {auth: authReducer},
        preloadedState
    });
}

// Crea un componente con el provider (con el estado si se le pasa), el router y el componente a renderizar
function renderWithProvidersAndRouter(element, state) {
    const store = getStore(state);
    render(
        <Provider store={store}>
            <MemoryRouter>
                {element}
            </MemoryRouter>
        </Provider>
    );
    return {store}
}