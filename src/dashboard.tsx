import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
    collection,
    addDoc,
    doc,
    setDoc,
    getDocs,
    onSnapshot,
} from "firebase/firestore";
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
    const [currentPage, setCurrentPage] = useState(0);
    const [partners, setPartners] = useState<Entry[]>([]);

    /*useEffect(() => {
        const fetchPartners = async () => {
            console.log(partners);
            alert("hi");
            const partnersCollection = collection(db, "Partners"); // Assuming "partners" is your collection name
            const snapshot = await getDocs(partnersCollection);
            const partnersData = snapshot.docs.map(
                (doc) => doc.data() as Entry
            );
            setPartners(partnersData);
            alert("here");
        };

        const unsubscribe = onSnapshot(
            collection(db, "partners"),
            (snapshot) => {
                const partnersData = snapshot.docs.map(
                    (doc) => doc.data() as Entry
                );
                setPartners(partnersData);
            }
        );

        fetchPartners(); // Fetch partners when component mounts
        return () => unsubscribe(); // Unsubscribe from snapshot listener when component unmounts
    }, []);*/

    const handleOpenDialog = () => {
        setOpenDialog(true);
        setCurrentPage(0);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleNext = () => {
        setCurrentPage(1); // Switch to contact info page
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
        setOpenDialog(false);
        setLoading(false);
    };

    return (
        <Layout footer={2} headerBtn={true}>
            <div style={{ padding: "100px" }}>
                <Button variant="outlined" onClick={handleOpenDialog}>
                    Add Partner
                </Button>
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    style={{ width: "800px", border: "10px solid black" }}
                >
                    <DialogTitle>Add Partner</DialogTitle>
                    <DialogContent style={{ width: "800px" }}>
                        {currentPage === 0 && (
                            <form noValidate autoComplete="off">
                                <TextField
                                    name="name"
                                    label="Name"
                                    value={formData.name}
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
                                    multiline
                                    rows={4}
                                />
                                <TextField
                                    select
                                    name="organizationType"
                                    label="Organization Type"
                                    value={formData.organizationType}
                                    onChange={handleInputChange}
                                    fullWidth
                                >
                                    <MenuItem value="Education Institution">
                                        Education Institution
                                    </MenuItem>
                                    <MenuItem value="Industry Partner">
                                        Industry Partner
                                    </MenuItem>
                                    <MenuItem value="Non-profit Organization">
                                        Non-profit Organization
                                    </MenuItem>
                                    <MenuItem value="Government Agency">
                                        Government Agency
                                    </MenuItem>
                                    {/* Add more options as needed */}
                                </TextField>
                                <TextField
                                    select
                                    name="partnershipType"
                                    label="Partnership Type"
                                    value={formData.partnershipType}
                                    onChange={handleInputChange}
                                    fullWidth
                                >
                                    <MenuItem value="Internship Program">
                                        Internship Program
                                    </MenuItem>
                                    <MenuItem value="Apprenticeship Program">
                                        Apprenticeship Program
                                    </MenuItem>
                                    <MenuItem value="Work-Based Learning">
                                        Work-Based Learning
                                    </MenuItem>
                                    <MenuItem value="Curriculum Development">
                                        Curriculum Development
                                    </MenuItem>
                                    {/* Add more options as needed */}
                                </TextField>
                                <TextField
                                    select
                                    name="resourcesAvailable"
                                    label="Resources Available"
                                    value={formData.resourcesAvailable}
                                    onChange={handleInputChange}
                                    fullWidth
                                >
                                    <MenuItem value="Mentoring">
                                        Mentoring
                                    </MenuItem>
                                    <MenuItem value="Internships">
                                        Internships
                                    </MenuItem>
                                    <MenuItem value="Workshops">
                                        Workshops
                                    </MenuItem>
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
                            </form>
                        )}
                        {currentPage === 1 && (
                            <form noValidate autoComplete="off">
                                <TextField
                                    name="contactName"
                                    label="Contact Name"
                                    value={formData.contactInfo.name}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                                <TextField
                                    name="contactEmail"
                                    label="Contact Email"
                                    value={formData.contactInfo.email}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                                <TextField
                                    name="contactPhone"
                                    label="Contact Phone"
                                    value={formData.contactInfo.phone}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </form>
                        )}
                    </DialogContent>
                    <DialogActions>
                        {currentPage === 0 && (
                            <Button onClick={handleCloseDialog}>Cancel</Button>
                        )}
                        {currentPage === 0 && (
                            <Button onClick={handleNext}>Next</Button>
                        )}
                        {currentPage === 1 && (
                            <Button onClick={() => setCurrentPage(0)}>
                                Back
                            </Button>
                        )}
                        {currentPage === 1 && (
                            <Button onClick={handleSubmit} color="primary">
                                Submit
                            </Button>
                        )}
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <h1>All Partners</h1>
                <ul>
                    {partners.map((partner, index) => (
                        <li key={index}>
                            <strong>{partner.name}</strong>
                            <br />
                            Organization Type: {partner.organizationType}
                            <br />
                            Resources Available:{" "}
                            {partner.resourcesAvailable.join(", ")}
                            <br />
                            {/* Render other partner details as needed */}
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
};

export default Dashboard;
