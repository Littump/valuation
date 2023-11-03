import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import { QueryClient, QueryClientProvider } from "react-query";
import { YMaps } from "@pbe/react-yandex-maps";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <YMaps>
        <App />
      </YMaps>
    </QueryClientProvider>
  </Provider>
);
