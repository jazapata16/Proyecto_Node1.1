import { useAuth } from "../../context/authContext";
import { useOrders } from "../../context/ordersContext";
import { Button, ButtonLink, Card } from "../ui";
import { useState } from "react";

export function OrderCard({ order }) {
  const { deleteOrder, updateOrder } = useOrders();
  const { isAdmin,isOperador} = useAuth();

  const [showOptions, setShowOptions] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [textBox, setTextBox] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [enableConf, setEnableConf] = useState(false);

  const handleEcua = () => {
    setActiveButton("Ecuador Express");
    if (order.orderStatus != "CANCELADO") {
      order.courier = "Ecuador Express";
      order.orderStatus = "EN DESPACHO";
    }
    updateOrder(order);
  };

  const handleServi = () => {
    setActiveButton("ServiRapido");
    if (order.orderStatus != "CANCELADO") {
      order.courier = "ServiRapido";
      order.orderStatus = "EN DESPACHO";
    }
    updateOrder(order);
  };

  const handleConf = () => {
    order.ordermotivo = cancelReason;
    console.log(order.ordermotivo);
    if (order.orderStatus == "CANCELADO") {
      order.orderStatus = "ENVIADO";
      order.courier = "NULL";
    } else {
      order.orderStatus = "CANCELADO";
      order.courier = "NULL";
    }
    console.log(order.orderStatus);
    setIsCancelled(!isCancelled);
    setTextBox(!textBox);
    updateOrder(order);
  };

  const handleCancel = () => {
    console.log(order.orderStatus);
    setTextBox(!textBox);
  };

  const handleCancelReasonChange = (event) => {
    setCancelReason(event.target.value);
    setEnableConf(event.target.value !== "");
  };

  const handleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{order.title}</h1>
      </header>
  
      {isAdmin ? (
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-2 items-center">
            <Button onClick={() => deleteOrder(order._id)}>Eliminar</Button>
            <Button
              onClick={handleCancel}
              className={isCancelled ? "text-red-500" : "text-white"}
            >
              {isCancelled ? "Enviar" : "Cancelar"}
            </Button>
            <div className="relative">
              <Button onClick={handleOptions}>Courier... </Button>
              {showOptions && (
                <div className="absolute top-12 right-0 bg-black rounded-lg p-2">
                  <button
                    onClick={handleEcua}
                    className={`block w-min text-left ${
                      activeButton === "Ecuador Express" ? "bg-green-500" : ""
                    }`}
                  >
                    Ecuador Express
                  </button>
                  <button
                    onClick={handleServi}
                    className={`block w-full text-left ${
                      activeButton === "ServiRapido" ? "bg-green-500" : ""
                    }`}
                  >
                    ServiRapido
                  </button>
                </div>
              )}
            </div>
          </div>
          {textBox && (
            <div className="flex gap-x-2">
              <input
                type="text"
                className="bg-black"
                placeholder="Motivo de cancelación"
                value={cancelReason}
                onChange={handleCancelReasonChange}
              />
              {enableConf && (
                <Button onClick={handleConf}>Confirmar</Button>
              )}
            </div>
          )}
        </div>
      ) : isOperador ? (
        <div className="relative">
              <Button onClick={handleOptions}>Courier... </Button>
              {showOptions && (
                <div className="absolute top-12 right-0 bg-black rounded-lg p-2">
                  <button
                    onClick={handleEcua}
                    className={`block w-min text-left ${
                      activeButton === "Ecuador Express" ? "bg-green-500" : ""
                    }`}
                  >
                    Ecuador Express
                  </button>
                  <button
                    onClick={handleServi}
                    className={`block w-full text-left ${
                      activeButton === "ServiRapido" ? "bg-green-500" : ""
                    }`}
                  >
                    ServiRapido
                  </button>
                </div>
              )}
            </div>
      ) : 
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteOrder(order._id)}>Delete</Button>
          <ButtonLink to={`/orders/${order._id}`}>Edit</ButtonLink>
        </div>
    }
  
      <p className="text-slate-300">{order.description}</p>
      {/* format date */}
      <p>
        {order.date &&
          new Date(order.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
    </Card>
  );
  
}
