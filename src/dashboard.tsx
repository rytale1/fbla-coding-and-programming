import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { Col, Row } from "react-bootstrap";
import Layout from "./layout/Layout";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { redirect } from "react-router-dom";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";

interface DashboardProps {}
interface Entry {
    name: string; // Name of the partner
    organizationType: string; // Type of organization (e.g., Corporation, Non-profit, Government Agency)
    resourcesAvailable: string[]; // Array of available resources (e.g., Mentoring, Internships, Workshops)
    contactInfo: {
        name: string; // Contact person's name
        email: string; // Contact person's email
        phone: string; // Contact person's phone number
    };
    website: string; // Partner's website URL
    address: string; // Partner's physical address
    description: string; // Description of the partner organization
    partnershipType: string; // Type of partnership (e.g., Formal, Informal, Strategic)
    targetAudience: string[]; // Array of target audience (e.g., High school students, College graduates)
}

const Dashboard: React.FC<DashboardProps> = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState<Entry>({
        name: "",
        organizationType: "",
        resourcesAvailable: [],
        contactInfo: {
            name: "",
            email: "",
            phone: "",
        },
        website: "",
        address: "",
        description: "",
        partnershipType: "",
        targetAudience: [],
    });
    const [uid, setUid] = useState("");
    const [loading, setLoading] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            alert("HI");
            setLoading(true);
            const setRef = collection(db, "Partners");
            await addDoc(setRef, formData);
        } catch (e: any) {
            alert("Error adding document: " + e.message);
        }
        setLoading(false);
    };

    return (
        <Layout footer={2} headerBtn={true}>
            <div style={{ padding: "100px" }}>
                <Button variant="outlined" onClick={handleOpenDialog}>
                    Add Partner
                </Button>
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Add Partner</DialogTitle>
                    <DialogContent>
                        {/* Input fields */}
                        <TextField
                            name="name"
                            label="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            name="organizationType"
                            label="Organization Type"
                            value={formData.organizationType}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            name="website"
                            label="Website"
                            value={formData.website}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            name="address"
                            label="Address"
                            value={formData.address}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            name="description"
                            label="Description"
                            value={formData.description}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            name="partnershipType"
                            label="Partnership Type"
                            value={formData.partnershipType}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            select
                            name="resourcesAvailable"
                            label="Resources Available"
                            value={formData.resourcesAvailable}
                            onChange={handleInputChange}
                            fullWidth
                        >
                            <MenuItem value="Mentoring">Mentoring</MenuItem>
                            <MenuItem value="Internships">Internships</MenuItem>
                            <MenuItem value="Workshops">Workshops</MenuItem>
                            {/* Add more options as needed */}
                        </TextField>
                        <TextField
                            select
                            name="targetAudience"
                            label="Target Audience"
                            value={formData.targetAudience}
                            onChange={handleInputChange}
                            fullWidth
                        >
                            <MenuItem value="High school students">
                                High school students
                            </MenuItem>
                            <MenuItem value="College graduates">
                                College graduates
                            </MenuItem>
                            {/* Add more options as needed */}
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Layout>
    );
};

export default Dashboard;
