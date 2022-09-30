import { Button, TextField } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { db } from "../../serverless/firebase";
import {useSession} from 'next-auth/react';

function registerlabor() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [place, setPlace] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [skills, setSkills] = useState("");
    const [preferredLang, setPreferredLang] = useState("");
    const [education, setEducation] = useState("");

    const {data: session} = useSession();

    const submitForm = async (e: any) => {
        e.preventDefault();
        await setDoc(doc(db, `users/${session?.user?.email}`), {
            email: session?.user?.email,
            type: "laboror",
            name: name,
            place: place,
            skills: skills,
            preferredLang: preferredLang,
            education: education,
            openForWork: false
        });
        router.push("/");
    };
    const signout = () => {
        signOut();
        router.push('/')
    }

    return (
        <div className="w-screen h-screen space-y-6">
            <h1 className="text-5xl text-center">Enter your details</h1>
            <h2 className="text-center text-3xl">Labor registration form</h2>
            <Button onClick={() => signout()}>Signout</Button>
            <form
                className="flex flex-col space-y-4 w-[80%] mx-auto"
                onSubmit={submitForm}
            >
                <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Place"
                    variant="outlined"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                />
                <TextField
                    label="Phone Number"
                    variant="outlined"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <TextField
                    label="Skills"
                    variant="outlined"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                />
                <TextField
                    label="Preferred Language"
                    variant="outlined"
                    value={preferredLang}
                    onChange={(e) => setPreferredLang(e.target.value)}
                />
                <TextField
                    label="Education"
                    variant="outlined"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                />
                <Button
                    variant="outlined"
                    endIcon={<AiOutlineSend />}
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default registerlabor;
