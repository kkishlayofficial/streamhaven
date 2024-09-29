import { Provider } from "react-redux";
import Body from "./components/Body";
import appStore from "./utils/appStore";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(appStore);

function App() {
  return (
    <Provider store={appStore}>
      <PersistGate persistor={persistor}>
        <Body />
      </PersistGate>
    </Provider>
  );
}

export default App;
