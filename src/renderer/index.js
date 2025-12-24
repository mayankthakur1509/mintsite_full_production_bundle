import React from "react";
import ReactDOMServer from "react-dom/server";

// Map your components
import AuthorityPage from "../components/AuthorityPage.jsx";
import LawyerProfile from "../components/LawyerProfile.jsx";
import PracticePage from "../components/PracticePage.jsx";
import VFLP_CEO from "../components/VFLP_CEO.jsx";
import VFLP_CFO from "../components/VFLP_CFO.jsx";
import VFLP_GC from "../components/VFLP_GC.jsx";
// import VFLP_TAX_DIRECTOR from "../components/VFLP_TAX_DIRECTOR.jsx";

const components = {
    AuthorityPage,
    LawyerProfile,
    PracticePage,
    VFLP_CEO,
    VFLP_CFO,
    VFLP_GC,
    // VFLP_TAX_DIRECTOR
};



export const renderer = {
    render: async (componentName, props) => {
        const Component = components[componentName];
        if (!Component) {
            return `<h1>Component ${componentName} not found</h1>`;
        }

        return ReactDOMServer.renderToString(
            React.createElement(Component, props)
        );
    }
};
