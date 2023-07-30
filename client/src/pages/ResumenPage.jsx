import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useOrders } from "../context/ordersContext";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";

export default function ResumenPage() {
    const navigate = useNavigate();
    const {handleSubmit,formState: { errors },} = useForm();
    const location = useLocation();
    const jsonObject = location.state;
    const photos = JSON.parse(sessionStorage.getItem('photos'));
    const title = sessionStorage.getItem('title');
    console.log(sessionStorage.getItem('title'));
    console.log(sessionStorage.getItem('billingInfo'))
  return (
    <div>
        <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
            {title}
        </h1>
        <div>
            {photos.map((photoUrl, index) => (
            <img key={index} src={photoUrl} alt={`Photo ${index}`} />
            ))}
        </div>
        <div style={{textAlign:'center'}}>
            <h1 style={{textAlign:'center'}}>Billing Information: </h1>
            {sessionStorage.getItem('billingInfo')}
        </div>
        <div style={{textAlign:'center'}}>
            <h1 style={{textAlign:'center'}}>Shipping Information:</h1>
            {sessionStorage.getItem('shippingInfo')}
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={() => navigate('/orders')}>Ver Órdenes</button>
        </div>
    </div>

  );
}