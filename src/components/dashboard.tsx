import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
    collection,
    addDoc,
    doc,
    setDoc,
    getDocs,
    onSnapshot,
    deleteDoc,
    getDoc,
    where,
    query,
} from "firebase/firestore";
import { Col, Fade, Modal, Row } from "react-bootstrap";
import Layout from "../layout/Layout";
import {
    Backdrop,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
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
import { auth, db, logout } from "../auth";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { validateLength, validateUrl } from "../utils";

interface DashboardProps {}
interface Entry {
    id: string;
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
    const [ascendingSort, setAscendingSort] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [sortField, setSortField] = useState("businessname");
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState<Entry | null>();
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState<Entry>({
        id: "",
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
    const [isAdmin, setIsAdmin] = useState(false);

    // Error state to validate the different fields
    const [orgNameError, setOrgNameError] = useState(false);
    const [urlError, setUrlError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [orgTypeError, setOrgTypeError] = useState(false);
    const [partnershipError, setPartnershipError] = useState(false);
    const [resourcesError, setResourcesError] = useState(false);
    const [targetError, setTargetError] = useState(false);

    const fetchPartners = async () => {
        const partnersCollection = collection(db, "Partners"); // Assuming "partners" is your collection name
        const snapshot = await getDocs(partnersCollection);
        if (snapshot.docs) {
            snapshot.docs.forEach((doc) => {
                //      console.log(JSON.stringify(doc.data()));
            });
        }
        const partnersData: Entry[] = snapshot.docs.map((doc) => {
            const data = doc.data() as Entry;
            return { ...data, id: doc.id }; // Include the id field from doc
        });
        //        const partnersData = snapshot.docs.map((doc) => doc.data() as Entry);
        console.log(
            "Partners Data :" +
                partnersData.length +
                "-------" +
                JSON.stringify(partnersData)
        );
        setPartners(partnersData);
        return partnersData;
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

    const handleSort = (
        entries: Entry[],
        field: keyof Entry,
        ascending: boolean = true
    ): Entry[] => {
        const sortedEntries = [...entries];
        setSortField(field);
        setAscendingSort(!ascending);
        sortedEntries.sort((a, b) => {
            let aValue = a[field];
            let bValue = b[field];

            // If the field is an array, concatenate the elements into a string for comparison
            if (Array.isArray(aValue)) aValue = aValue.join(", ");
            if (Array.isArray(bValue)) bValue = bValue.join(", ");

            if (typeof aValue === "string" && typeof bValue === "string") {
                // Case-insensitive string comparison
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (aValue < bValue) return ascending ? -1 : 1;
            if (aValue > bValue) return ascending ? 1 : -1;
            return 0;
        });
        setPartners(sortedEntries);
        return sortedEntries;
    };

    const handleOpenDialog = () => {
        resetErrors();
        setCurrentPage(0);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const resetErrors = () => {
        // Reset all error codes
        setOrgNameError(false);
        setUrlError(false);
        setAddressError(false);
        setDescriptionError(false);
        setOrgTypeError(false);
        setPartnershipError(false);
        setResourcesError(false);
        setTargetError(false);
    };
    const handleNext = () => {
        resetErrors();
        let errors = 0;
        // Test all the different fields and validate them
        if (!validateLength(formData.businessname)) {
            setOrgNameError(true);
            errors++;
        }
        if (!validateUrl(formData.website)) {
            setUrlError(true);
            errors++;
        }
        if (!validateLength(formData.address)) {
            setAddressError(true);
            errors++;
        }
        if (!validateLength(formData.description)) {
            setDescriptionError(true);
            errors++;
        }
        if (formData.organizationType === "") {
            setOrgTypeError(true);
            errors++;
        }
        if (formData.partnershipType === "") {
            setPartnershipError(true);
            errors++;
        }
        if (formData.resourcesAvailable.length === 0) {
            setResourcesError(true);
            errors++;
        }
        if (formData.targetAudience.length == 0) {
            setTargetError(true);
            errors++;
        }
        // Switch to next page if there are no errors
        if (errors === 0) setCurrentPage(1);
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
        setLoading(true);

        try {
            if (editMode) {
                const partnerDocRef = doc(db, "Partners", formData.id); // Assuming formData contains the document ID
                await setDoc(partnerDocRef, formData); // Set the document data
            } else {
                const setRef = collection(db, "Partners");
                await addDoc(setRef, formData);
            }
        } catch (e: any) {
            console.log("Error adding document" + e.message);
        }
        setEditMode(false); // Reset edit mode after submission
        setOpenDialog(false);
        setLoading(false);
        setFormData({
            id: "",
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

    const handleDelete = async (partner: Entry) => {
        const confirmation = window.confirm(
            "Are you sure you want to delete " + partner.businessname + "?"
        );
        if (confirmation) {
            const partnerDocRef = doc(db, "Partners", partner.id); // Assuming "Partners" is your collection name
            try {
                await deleteDoc(partnerDocRef);
                console.log("Document successfully deleted!");
            } catch (error) {
                console.error("Error deleting document: ", error);
            }
            fetchPartners();
        }
    };

    const handleEdit = async (partner: Entry) => {
        setEditMode(true);
        const partnerDocRef = doc(db, "Partners", partner.id); // Create a reference to the specific document
        const partnerSnapshot = await getDoc(partnerDocRef); // Retrieve the document data

        if (partnerSnapshot.exists()) {
            // Document exists, access its data using .data()
            let partnerData = partnerSnapshot.data() as Entry;
            partnerData = { ...partnerData, id: partner.id };
            setFormData(partnerData);
            setOpenDialog(true);
            console.log("Partner data:", partnerData);
            return partnerData;
        } else {
            console.log("No such document!");
            return null;
        }
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
    const [organizationTypeFilter, setOrganizationTypeFilter] =
        useState<string>("");
    const [resourcesAvailableFilter, setResourcesAvailableFilter] =
        useState<string>("");
    const [businessNameFilter, setBusinessNameFilter] = useState<string>("");

    const handleOrganizationTypeChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedOrganizationType = event.target.value;
        setOrganizationTypeFilter(selectedOrganizationType);
        filterPartners(
            selectedOrganizationType,
            resourcesAvailableFilter,
            businessNameFilter
        );
    };

    const handleResourcesAvailableChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedResourcesAvailable = event.target.value;
        setResourcesAvailableFilter(selectedResourcesAvailable);
        filterPartners(
            organizationTypeFilter,
            selectedResourcesAvailable,
            businessNameFilter
        );
    };

    const handleBusinessNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        console.log("here", event);
        const businessName = event.target.value;
        setBusinessNameFilter(businessName);
        filterPartners(
            organizationTypeFilter,
            resourcesAvailableFilter,
            businessName
        );
    };

    const filterPartners = async (
        organizationType: string,
        resourcesAvailable: string,
        businessName: string
    ) => {
        let filteredPartners = await fetchPartners();
        if (organizationType) {
            filteredPartners = filteredPartners.filter(
                (partner) => partner.organizationType === organizationType
            );
        }
        if (resourcesAvailable) {
            filteredPartners = filteredPartners.filter((partner) =>
                partner.resourcesAvailable.includes(resourcesAvailable)
            );
        }
        if (businessName) {
            filteredPartners = filteredPartners.filter((partner) =>
                partner.businessname
                    .toLowerCase()
                    .includes(businessName.toLowerCase())
            );
        }
        setPartners(filteredPartners);
    };

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid;
            const q = query(collection(db, "users"), where("uid", "==", uid));
            const qSnapshot = await getDocs(q);
            qSnapshot.forEach((doc) => {
                if (doc.data().accountType === "Staff") {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            });
        }
    });

    return (
        <Layout footer={2} headerBtn={true}>
            {isAdmin && (
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    style={{ width: "1500px" }}
                >
                    <DialogTitle>Add Partner</DialogTitle>
                    <DialogContent style={{}}>
                        {currentPage === 0 && (
                            <form
                                noValidate
                                autoComplete="off"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "20px",
                                }}
                            >
                                <TextField
                                    name="businessname"
                                    label="Organization Name"
                                    value={formData.businessname}
                                    onChange={handleInputChange}
                                    style={{
                                        width: "550px",
                                        marginTop: "5px",
                                    }}
                                />
                                {orgNameError && (
                                    <Row
                                        style={{
                                            color: "red",
                                            padding: "10px",
                                        }}
                                    >
                                        Please enter more than 5 characters.
                                    </Row>
                                )}
                                <TextField
                                    name="website"
                                    label="Website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    style={{ width: "550px" }}
                                />
                                {urlError && (
                                    <Row
                                        style={{
                                            color: "red",
                                            padding: "10px",
                                        }}
                                    >
                                        URL is invalid. Please enter a valid URL
                                        starting with https://
                                    </Row>
                                )}
                                <TextField
                                    name="address"
                                    label="Address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    style={{ width: "550px" }}
                                />
                                {addressError && (
                                    <Row
                                        style={{
                                            color: "red",
                                            padding: "10px",
                                        }}
                                    >
                                        Please enter more than 5 characters.
                                    </Row>
                                )}
                                <TextField
                                    name="description"
                                    label="Description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    style={{ width: "550px" }}
                                    multiline
                                    rows={4}
                                />
                                {descriptionError && (
                                    <Row
                                        style={{
                                            color: "red",
                                            padding: "10px",
                                        }}
                                    >
                                        Please enter a more detailed
                                        description.
                                    </Row>
                                )}
                                <TextField
                                    select
                                    name="organizationType"
                                    label="Organization Type"
                                    value={formData.organizationType}
                                    onChange={handleInputChange}
                                    style={{ width: "550px" }}
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
                                {orgTypeError && (
                                    <Row
                                        style={{
                                            color: "red",
                                            padding: "10px",
                                        }}
                                    >
                                        Please select an organization type.
                                    </Row>
                                )}
                                <TextField
                                    select
                                    name="partnershipType"
                                    label="Partnership Type"
                                    value={formData.partnershipType}
                                    onChange={handleInputChange}
                                    style={{ width: "550px" }}
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
                                {partnershipError && (
                                    <Row
                                        style={{
                                            color: "red",
                                            padding: "10px",
                                        }}
                                    >
                                        Please select a partnership type.
                                    </Row>
                                )}
                                <TextField
                                    select
                                    name="resourcesAvailable"
                                    label="Resources Available"
                                    value={formData.resourcesAvailable}
                                    onChange={handleInputChange}
                                    style={{ width: "550px" }}
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
                                {resourcesError && (
                                    <Row
                                        style={{
                                            color: "red",
                                            padding: "10px",
                                        }}
                                    >
                                        Please select a resource.
                                    </Row>
                                )}
                                <TextField
                                    select
                                    name="targetAudience"
                                    label="Target Audience"
                                    value={formData.targetAudience}
                                    onChange={handleInputChange}
                                    style={{ width: "550px" }}
                                >
                                    <MenuItem value="Freshman">
                                        Freshmen
                                    </MenuItem>
                                    <MenuItem value="Sophomore">
                                        Sophomores
                                    </MenuItem>
                                    <MenuItem value="Junior">Juniors</MenuItem>
                                    <MenuItem value="Senior">Seniors</MenuItem>
                                    <MenuItem value="Any">Any</MenuItem>
                                    {/* Add more options as needed */}
                                </TextField>
                                {targetError && (
                                    <Row
                                        style={{
                                            color: "red",
                                            padding: "10px",
                                        }}
                                    >
                                        Please select a target group.
                                    </Row>
                                )}
                            </form>
                        )}
                        {currentPage === 1 && (
                            <form
                                noValidate
                                autoComplete="off"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "20px",
                                }}
                            >
                                <TextField
                                    name="name"
                                    label="Contact Name"
                                    value={formData.contactInfo.name}
                                    onChange={handleInputChange}
                                    style={{
                                        width: "550px",
                                        marginTop: "5px",
                                    }}
                                />
                                <TextField
                                    name="email"
                                    label="Contact Email"
                                    value={formData.contactInfo.email}
                                    onChange={handleInputChange}
                                    style={{ width: "550px" }}
                                />
                                <TextField
                                    name="phone"
                                    label="Contact Phone"
                                    value={formData.contactInfo.phone}
                                    onChange={handleInputChange}
                                    style={{ width: "550px" }}
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
            )}
            <div style={{ marginTop: "100px", padding: "10px" }}>
                <Row>
                    <Col>
                        <div>
                            <label htmlFor="organizationType">
                                <b>Org</b>
                            </label>
                            <select
                                id="organizationType"
                                onChange={handleOrganizationTypeChange}
                                style={{ marginLeft: "5px" }}
                            >
                                <option value="">All</option>
                                <option value="Education Institution">
                                    Education Institution
                                </option>
                                <option value="Industry Partner">
                                    Industry Partner
                                </option>
                                <option value="Non-profit Organization">
                                    Non-profit Organization
                                </option>
                                <option value="Government Agency">
                                    Government Agency
                                </option>
                            </select>
                        </div>
                    </Col>
                    <Col style={{ textAlign: "left" }}>
                        <div>
                            <label htmlFor="resourcesAvailable">
                                <b>Resources</b>
                            </label>
                            <select
                                id="resourcesAvailable"
                                onChange={handleResourcesAvailableChange}
                                style={{
                                    marginLeft: "5px",
                                }}
                            >
                                <option value="">All</option>
                                <option value="Mentoring">Mentoring</option>
                                <option value="Internships">Internships</option>
                                <option value="Workshops">Workshops</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <label htmlFor="businessName">
                                <b>Name</b>
                            </label>
                            <input
                                id="businessName"
                                onChange={handleBusinessNameChange}
                                style={{
                                    marginLeft: "5px",
                                    width: "150px",
                                    height: "30px",
                                    borderRadius: "0",
                                    borderColor: "#000000",
                                }}
                            />
                        </div>
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                        {isAdmin && (
                            <Button
                                variant="outlined"
                                onClick={handleOpenDialog}
                            >
                                Add Partner
                            </Button>
                        )}
                    </Col>
                </Row>
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
                            <Row style={{ minHeight: "30px" }}>
                                <Col
                                    md="2"
                                    style={{
                                        fontWeight: "bold",
                                        borderBottom: "1px solid #ccc",
                                    }}
                                >
                                    <a
                                        href="#"
                                        style={{ textDecoration: "underline" }}
                                        onClick={() => {
                                            handleSort(
                                                partners,
                                                "businessname",
                                                ascendingSort
                                            );
                                        }}
                                    >
                                        Name
                                    </a>
                                </Col>
                                <Col
                                    md="2"
                                    style={{
                                        fontWeight: "bold",
                                        borderBottom: "1px solid #ccc",
                                    }}
                                >
                                    <a
                                        href="#"
                                        style={{ textDecoration: "underline" }}
                                        onClick={() => {
                                            handleSort(
                                                partners,
                                                "organizationType",
                                                ascendingSort
                                            );
                                        }}
                                    >
                                        Organization Type
                                    </a>
                                </Col>
                                <Col
                                    md="2"
                                    style={{
                                        fontWeight: "bold",
                                        borderBottom: "1px solid #ccc",
                                    }}
                                >
                                    <a
                                        href="#"
                                        style={{ textDecoration: "underline" }}
                                        onClick={() => {
                                            handleSort(
                                                partners,
                                                "partnershipType",
                                                ascendingSort
                                            );
                                        }}
                                    >
                                        Partnership Type
                                    </a>
                                </Col>
                                <Col
                                    md="2"
                                    style={{
                                        fontWeight: "bold",
                                        borderBottom: "1px solid #ccc",
                                    }}
                                >
                                    <a
                                        href="#"
                                        style={{ textDecoration: "underline" }}
                                        onClick={() => {
                                            handleSort(
                                                partners,
                                                "resourcesAvailable",
                                                ascendingSort
                                            );
                                        }}
                                    >
                                        Resources Available
                                    </a>
                                </Col>
                                <Col
                                    md="1"
                                    style={{
                                        fontWeight: "bold",
                                        borderBottom: "1px solid #ccc",
                                    }}
                                >
                                    <a
                                        href="#"
                                        style={{ textDecoration: "underline" }}
                                        onClick={() => {
                                            handleSort(
                                                partners,
                                                "targetAudience",
                                                ascendingSort
                                            );
                                        }}
                                    >
                                        Audience
                                    </a>
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
                                <Col md="1"></Col>
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
                                            padding: "10px 0 0 0",
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
                                        <Col md="1">
                                            {partner.targetAudience}
                                        </Col>
                                        <Col md="2">
                                            {partner.contactInfo.name}
                                        </Col>
                                        <Col md="1">
                                            {" "}
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() =>
                                                    handleDelete(partner)
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label="edit"
                                                onClick={() =>
                                                    handleEdit(partner)
                                                }
                                            >
                                                <EditIcon />
                                            </IconButton>
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
