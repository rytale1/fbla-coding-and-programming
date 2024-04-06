import React, { useState } from "react";
import { Paper, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Row, Col } from "react-bootstrap";
import { PartnerEntry } from "./dashboard";
import DashboardDetail from "./dashboard_detail";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../auth";
import { collection, getDocs, query, where } from "firebase/firestore";

interface Props {
    partners: PartnerEntry[];
    handleSort: (
        partners: PartnerEntry[],
        field: keyof PartnerEntry,
        ascending?: boolean
    ) => void;
    handleRowClick: (partner: PartnerEntry) => void;
    handleDelete: (partner: PartnerEntry) => void;
    handleEdit: (partner: PartnerEntry) => void;
    handleCloseModal: () => void;
    selectedPartner: PartnerEntry | null | undefined;
}

const DashboardList: React.FC<Props> = ({
    partners,
    handleSort,
    handleRowClick,
    handleDelete,
    handleEdit,
    handleCloseModal,
    selectedPartner,
}) => {
    const [hovered, setHovered] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);

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
                                        handleSort(partners, "businessname");
                                    }}
                                >
                                    Organization Name
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
                                            "organizationType"
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
                                        handleSort(partners, "partnershipType");
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
                                            "resourcesAvailable"
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
                                        handleSort(partners, "targetAudience");
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
                                        backgroundColor:
                                            hovered === partner.id
                                                ? "#ddd"
                                                : "inherit",
                                    }}
                                    onMouseEnter={() => setHovered(partner.id)}
                                    onMouseLeave={() => setHovered(partner.id)}
                                >
                                    <Col md="2">
                                        <b>{partner.businessname}</b>
                                    </Col>
                                    <Col md="2">{partner.organizationType}</Col>
                                    <Col md="2">{partner.partnershipType}</Col>
                                    <Col md="2">
                                        {partner.resourcesAvailable}
                                    </Col>
                                    <Col md="1">{partner.targetAudience}</Col>
                                    <Col md="2">{partner.contactInfo.name}</Col>
                                    <Col md="1">
                                        {" "}
                                        {isAdmin && (
                                        <>
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => handleDelete(partner)}
                                            >
                                                <DeleteIcon />
                                            </IconButton><IconButton
                                                aria-label="edit"
                                                onClick={() => handleEdit(partner)}
                                            >
                                                    <EditIcon />
                                                </IconButton>
                                        </>)}
                                    </Col>
                                </Row>
                                <DashboardDetail
                                    selectedPartner={selectedPartner}
                                    partner={partner}
                                    handleCloseModal={handleCloseModal}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default DashboardList;
