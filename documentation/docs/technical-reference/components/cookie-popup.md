---
id: cookie-popup
title: CookiePopup
sibebar_label: CookiePopup
---

# CookiePopup

The `CookiePopup` component handles user consent for data storage, ensuring compliance with privacy regulations (GDPR). It allows users to toggle specific cookie categories before accepting.

## Dependencies

This component relies on the `react-cookie-consent` library for the banner overlay and cookie management.

## Usage

The `CookiePopup` is placed at the root of the application (usually in `App.jsx`) to ensure it is available across all routes.

```jsx
import { CookiePopup } from "./components";

function App() {
    return (
        <>
            <CookiePopup />
            <RouterProvider router={router} />
        </>
    );
}
