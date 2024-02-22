import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
    collection,
    addDoc,
    doc,
    setDoc,
    getDocs,
    onSnapshot,
} from "firebase/firestore";
import { Col, Fade, Modal, Row } from "react-bootstrap";
import Layout from "./layout/Layout";
import {
    Backdrop,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    Menu,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { redirect, useNavigate } from "react-router-dom";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db, logout } from "./firebase";

interface DashboardProps {}
interface Entry {
    businessname: string; // Name of the partner
    organizationType: string; // Type of organization (e.g., Education Institution, Industry Partner, Non-profit Organization, Government Agency)
    resourcesAvailable: string[]; // Array of available resources (e.g., Mentoring, Internships, Workshops)
    contactInfo: {
        name: string; // Contact person's name
        email: string; // Contact person's email
        phone: string; // Contact person's phone number
    };
    website: string; // Partner's website URL
    address: string; // Partner's physical address
    description: string; // Description of the partner organization
    partnershipType: string; // Type of partnership (e.g., Internship, Apprenticeship, Work-based Learning, Curriculum Development)
    targetAudience: string[]; // Array of target audience (e.g., Freshmen, Sophomores, Juniors, Seniors)
}

const Dashboard: React.FC<DashboardProps> = () => {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState<Entry | null>();
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState<Entry>({
        businessname: "",
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
    const [refresh, setRefresh] = useState(true);

    const fetchPartners = async () => {
        const partnersCollection = collection(db, "Partners"); // Assuming "partners" is your collection name
        const snapshot = await getDocs(partnersCollection);
        if (snapshot.docs) {
            snapshot.docs.forEach((doc) => {
                //      console.log(JSON.stringify(doc.data()));
            });
        }
        const partnersData = snapshot.docs.map((doc) => doc.data() as Entry);
        console.log(
            "Partners Data :" +
                partnersData.length +
                "-------" +
                JSON.stringify(partnersData)
        );
        setPartners(partnersData);
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "partners"),
            (snapshot) => {
                const partnersData = snapshot.docs.map(
                    (doc) => doc.data() as Entry
                );
                //setPartners(partnersData);
            }
        );

        fetchPartners(); // Fetch partners when component mounts
        return () => unsubscribe(); // Unsubscribe from snapshot listener when component unmounts
    }, []);

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
        if (name === "phone" || name === "email" || name === "name") {
            const contact = formData.contactInfo;
            contact[name] = value;
            setFormData((prevState) => ({
                ...prevState,
                contactInfo: contact,
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const setRef = collection(db, "Partners");
            await addDoc(setRef, formData);
        } catch (e: any) {
            alert("Error adding document: " + e.message);
        }
        setOpenDialog(false);
        setLoading(false);
        setFormData({
            businessname: "",
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
        fetchPartners();
    };

    const handleRowClick = (partner: Entry) => {
        if (selectedPartner === null) setSelectedPartner(partner);
        else {
            setSelectedPartner(null);
        }
    };

    const handleCloseModal = () => {
        setSelectedPartner(null);
    };

    return (
        <Layout footer={2} headerBtn={true}>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                style={{ width: "1500px" }}
            >
                <DialogTitle>Add Partner</DialogTitle>
                <DialogContent style={{ width: "800px" }}>
                    {currentPage === 0 && (
                        <form noValidate autoComplete="off">
                            <TextField
                                name="businessname"
                                label="Name"
                                value={formData.businessname}
                                onChange={handleInputChange}
                                style={{ width: "550px", padding: "5px" }}
                            />
                            <TextField
                                name="website"
                                label="Website"
                                value={formData.website}
                                onChange={handleInputChange}
                                style={{ width: "550px", padding: "5px" }}
                            />
                            <TextField
                                name="address"
                                label="Address"
                                value={formData.address}
                                onChange={handleInputChange}
                                style={{ width: "550px", padding: "5px" }}
                            />
                            <TextField
                                name="description"
                                label="Description"
                                value={formData.description}
                                onChange={handleInputChange}
                                style={{ width: "550px", padding: "5px" }}
                                multiline
                                rows={4}
                            />
                            <TextField
                                select
                                name="organizationType"
                                label="Organization Type"
                                value={formData.organizationType}
                                onChange={handleInputChange}
                                style={{ width: "550px", padding: "5px" }}
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
                                style={{ width: "550px", padding: "5px" }}
                            >
                                <MenuItem value="Internship Program">
                                    Internship Program
                                </MenuItem>
                                <MenuItem value="Apprenticeship">
                                    Apprenticeship
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
                                style={{ width: "550px", padding: "5px" }}
                            >
                                <MenuItem value="Mentoring">Mentoring</MenuItem>
                                <MenuItem value="Internships">
                                    Internships
                                </MenuItem>
                                <MenuItem value="Workshops">Workshops</MenuItem>
                                {/* Add more options as needed */}
                            </TextField>
                            <TextField
                                select
                                name="targetAudience"
                                label="Target Audience"
                                value={formData.targetAudience}
                                onChange={handleInputChange}
                                style={{ width: "550px", padding: "5px" }}
                            >
                                <MenuItem value="Freshman">Freshmen</MenuItem>
                                <MenuItem value="Sophomore">
                                    Sophomores
                                </MenuItem>
                                <MenuItem value="Junior">Juniors</MenuItem>
                                <MenuItem value="Senior">Seniors</MenuItem>
                                {/* Add more options as needed */}
                            </TextField>
                        </form>
                    )}
                    {currentPage === 1 && (
                        <form noValidate autoComplete="off">
                            <TextField
                                name="name"
                                label="Contact Name"
                                value={formData.contactInfo.name}
                                onChange={handleInputChange}
                                style={{ width: "550px", padding: "5px" }}
                            />
                            <TextField
                                name="email"
                                label="Contact Email"
                                value={formData.contactInfo.email}
                                onChange={handleInputChange}
                                style={{ width: "550px", padding: "5px" }}
                            />
                            <TextField
                                name="phone"
                                label="Contact Phone"
                                value={formData.contactInfo.phone}
                                onChange={handleInputChange}
                                style={{ width: "550px", padding: "5px" }}
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
                        <Button onClick={() => setCurrentPage(0)}>Back</Button>
                    )}
                    {currentPage === 1 && (
                        <Button onClick={handleSubmit} color="primary">
                            Submit
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
            <div style={{ marginTop: "100px", padding: "10px" }}>
                <Button variant="outlined" onClick={handleOpenDialog} style={{marginRight: "20px"}}>
                    Add Partner
                </Button>
                <Button variant="outlined" onClick={logoutAndSendHome}>
                    Sign Out
                </Button>
            </div>
            <div style={{ padding: "5px", margin: "10px" }}>
                <Paper
                    elevation={10}
                    style={{
                        padding: "20px",
                        background: "#f5f5f5",
                        borderRadius: "10px",
                        marginBottom: "20px",
                    }}
                >
                    <div style={{ marginBottom: "20px" }}>
                        <h2 style={{ color: "#333", marginBottom: "10px" }}>
                            Partners
                        </h2>
                        <div>
                            <Row style={{ height: "30px" }}>
                                <Col
                                    md="2"
                                    style={{
                                        fontWeight: "bold",
                                        borderBottom: "1px solid #ccc",
                                    }}
                                >
                                    Name
                                </Col>
                                <Col
                                    md="2"
                                    style={{
                                        fontWeight: "bold",
                                        borderBottom: "1px solid #ccc",
                                    }}
                                >
                                    Organization Type
                                </Col>
                                <Col
                                    md="2"
                                    style={{
                                        fontWeight: "bold",
                                        borderBottom: "1px solid #ccc",
                                    }}
                                >
                                    Partnership Type
                                </Col>
                                <Col
                                    md="2"
                                    style={{
                                        fontWeight: "bold",
                                        borderBottom: "1px solid #ccc",
                                    }}
                                >
                                    Resources Available
                                </Col>
                                <Col
                                    md="2"
                                    style={{
                                        fontWeight: "bold",
                                        borderBottom: "1px solid #ccc",
                                    }}
                                >
                                    Target Audience
                                </Col>
                                <Col
                                    md="2"
                                    style={{
                                        fontWeight: "bold",
                                        borderBottom: "1px solid #ccc",
                                    }}
                                >
                                    Contact
                                </Col>
                            </Row>
                            {partners.map((partner, index) => (
                                <div>
                                    <Row
                                        key={index}
                                        onClick={() => handleRowClick(partner)}
                                        style={{
                                            cursor: "pointer",
                                            borderBottom: "1px solid #ddd",
                                            transition: "background-color 0.3s",
                                            height: "30px",
                                        }}
                                    >
                                        <Col md="2">{partner.businessname}</Col>
                                        <Col md="2">
                                            {partner.organizationType}
                                        </Col>
                                        <Col md="2">
                                            {partner.partnershipType}
                                        </Col>
                                        <Col md="2">
                                            {partner.resourcesAvailable}
                                        </Col>
                                        <Col md="2">
                                            {partner.targetAudience}
                                        </Col>
                                        <Col md="2">
                                            {partner.contactInfo.name}
                                        </Col>
                                    </Row>
                                    <div>
                                        {selectedPartner &&
                                            selectedPartner.businessname ===
                                                partner.businessname && (
                                                <div
                                                    style={{
                                                        background: "#fff",
                                                        padding: "20px",
                                                        borderRadius: "10px",
                                                        boxShadow:
                                                            "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                                    }}
                                                >
                                                    <h2
                                                        style={{
                                                            color: "#333",
                                                            marginBottom:
                                                                "20px",
                                                        }}
                                                    >
                                                        {
                                                            selectedPartner.businessname
                                                        }
                                                    </h2>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            marginBottom:
                                                                "10px",
                                                        }}
                                                    >
                                                        <p
                                                            style={{
                                                                flex: "1",
                                                                marginRight:
                                                                    "20px",
                                                            }}
                                                        >
                                                            <strong>
                                                                Organization
                                                                Type:
                                                            </strong>{" "}
                                                            {
                                                                selectedPartner.organizationType
                                                            }
                                                        </p>
                                                        <p
                                                            style={{
                                                                flex: "1",
                                                                marginRight:
                                                                    "20px",
                                                            }}
                                                        >
                                                            <strong>
                                                                Partnership
                                                                Type:
                                                            </strong>{" "}
                                                            {
                                                                selectedPartner.partnershipType
                                                            }
                                                        </p>
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            marginBottom:
                                                                "10px",
                                                        }}
                                                    >
                                                        <p
                                                            style={{
                                                                flex: "1",
                                                                marginRight:
                                                                    "20px",
                                                            }}
                                                        >
                                                            <strong>
                                                                Resources
                                                                Available:
                                                            </strong>{" "}
                                                            {
                                                                selectedPartner.resourcesAvailable
                                                            }
                                                        </p>
                                                        <p
                                                            style={{
                                                                flex: "1",
                                                                marginRight:
                                                                    "20px",
                                                            }}
                                                        >
                                                            <strong>
                                                                Target Audience:
                                                            </strong>{" "}
                                                            {
                                                                selectedPartner.targetAudience
                                                            }
                                                        </p>
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            marginBottom:
                                                                "10px",
                                                        }}
                                                    >
                                                        <p
                                                            style={{
                                                                flex: "1",
                                                                marginRight:
                                                                    "20px",
                                                            }}
                                                        >
                                                            <strong>
                                                                Contact:
                                                            </strong>{" "}
                                                            {`${selectedPartner.contactInfo.name} (${selectedPartner.contactInfo.email})`}
                                                        </p>
                                                        <p
                                                            style={{
                                                                flex: "1",
                                                                marginRight:
                                                                    "20px",
                                                            }}
                                                        >
                                                            <strong>
                                                                Website:
                                                            </strong>{" "}
                                                            <a
                                                                href={
                                                                    selectedPartner.website
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                {
                                                                    selectedPartner.website
                                                                }
                                                            </a>
                                                        </p>
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            marginBottom:
                                                                "10px",
                                                        }}
                                                    >
                                                        <p
                                                            style={{
                                                                flex: "1",
                                                                marginRight:
                                                                    "20px",
                                                            }}
                                                        >
                                                            <strong>
                                                                Address:
                                                            </strong>{" "}
                                                            {
                                                                selectedPartner.address
                                                            }
                                                        </p>
                                                    </div>
                                                    <div
                                                        style={{
                                                            marginBottom:
                                                                "10px",
                                                        }}
                                                    >
                                                        <strong>
                                                            Description:
                                                        </strong>{" "}
                                                        {
                                                            selectedPartner.description
                                                        }
                                                    </div>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={
                                                            handleCloseModal
                                                        }
                                                        style={{
                                                            marginTop: "10px",
                                                        }}
                                                    >
                                                        Close
                                                    </Button>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Paper>
            </div>
        </Layout>
    );
};

export default Dashboard;
