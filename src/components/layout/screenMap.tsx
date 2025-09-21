import DefaultScreen from "../dashboard/Default";
import { OrdersList } from "../dashboard/orders/OrdersList";

export const ScreenMap = {
  // overview: "Overview",
  // projects: "Projects",
  default: <DefaultScreen />,
  ecommerce: <DefaultScreen />,
  orders: <OrdersList />,
};
