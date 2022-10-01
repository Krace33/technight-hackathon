import { Avatar, Button, TextField } from "@mui/material";
import { addDoc, collection, orderBy, query, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Nav from "../components/common/NavbarLabor";
import { db } from "../serverless/firebase";
import { IoIosAddCircle } from "react-icons/io";
import { useSession } from "next-auth/react";
import Image from "next/image";
function Forum() {
    return (
        <div className="w-screen relative h-screen">
            <Nav />
            <Messages />
            <Input />
        </div>
    );
}

export default Forum;

const Input = () => {
    const [message, setMessage] = useState("");
    const { data: session } = useSession();
    const sendMessage = async (e: any) => {
        e.preventDefault();
        if (message.length < 1) return;

        const msg = message;
        setMessage("");

        await addDoc(collection(db, "messages"), {
            user: session?.user?.email,
            name: session?.user?.name,
            photoUrl: session?.user?.image,
            message: msg,
            timestamp: serverTimestamp(),
        });
    };
    return (
        <div className="absolute bottom-3 left-4 flex flex-col w-[90%] rounded-lg px-2 py-1 bg-gray-200">
            <div className="flex w-full space-x-2">
                <form className="w-full" onSubmit={sendMessage}>
                    <input
                        type="text"
                        className="w-4/5 outline-none rounded-lg bg-transparent px-2 py-1 text-black placeholder:text-black"
                        placeholder={`Message`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit" className="hidden">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

const Messages = () => {
    const [messages] = useCollection(query(collection(db, "messages"), orderBy('timestamp')));
    const endRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        endRef?.current?.scrollIntoView();
    }, [messages]);
    return (
        <div className="h-[80%] overflow-scroll">
            {messages?.docs?.map((message) => {
                return <div className="flex hover:bg-fabchat-hoverPrimary py-2 items-center relative">
                <div className="flex flex-col items-start justify-start p-2 cursor-pointer">
                    {message.data()?.photoUrl ? (
                        <Image
                            src={message.data()?.photoUrl}
                            alt="dp"
                            height={40}
                            width={40}
                            className="h-12 w-12 rounded-full"
                        />
                    ) : (
                        <Avatar />
                    )}
                </div>
    
                <div className="ml-3">
                    <p className="text-md cursor-pointer font-semibold text-fabchat-text">
                        {message.data()?.name}
                        <span className="ml-4 cursor-default text-xs font-normal text-gray-400 hover:no-underline">
                            {message.data()?.timestamp &&
                                new Date(
                                    message.data()?.timestamp?.toDate()
                                ).toLocaleString()}
                        </span>
                    </p>
    
                    <p className="text-black">{message.data()?.message}</p>
                </div>
            </div>;
            })}
            <div ref={endRef} />
        </div>
    );
};
