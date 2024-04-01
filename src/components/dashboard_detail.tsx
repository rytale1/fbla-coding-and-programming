import React, { useState } from "react";
import { Paper, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Row, Col } from "react-bootstrap";
import { PartnerEntry } from "./dashboard";

interface Props {
    selectedPartner: PartnerEntry | null | undefined;
    partner: PartnerEntry;
    handleCloseModal: () => void;
}

const DashboardDetail: React.FC<Props> = ({
    selectedPartner,
    partner,
    handleCloseModal,
}) => {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <div style={{ padding: "5px", margin: "10px" }}>
            {selectedPartner &&
                selectedPartner.businessname === partner.businessname && (
                    <div
                        style={{
                            background: "#fff",
                            padding: "20px",
                            borderRadius: "10px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <h2
                            style={{
                                color: "#333",
                                marginBottom: "20px",
                            }}
                        >
                            {selectedPartner.businessname}
                        </h2>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "10px",
                            }}
                        >
                            <p
                                style={{
                                    flex: "1",
                                    marginRight: "20px",
                                }}
                            >
                                <strong>Organization Type:</strong>{" "}
                                {selectedPartner.organizationType}
                            </p>
                            <p
                                style={{
                                    flex: "1",
                                    marginRight: "20px",
                                }}
                            >
                                <strong>Partnership Type:</strong>{" "}
                                {selectedPartner.partnershipType}
                            </p>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "10px",
                            }}
                        >
                            <p
                                style={{
                                    flex: "1",
                                    marginRight: "20px",
                                }}
                            >
                                <strong>Resources Available:</strong>{" "}
                                {selectedPartner.resourcesAvailable}
                            </p>
                            <p
                                style={{
                                    flex: "1",
                                    marginRight: "20px",
                                }}
                            >
                                <strong>Target Audience:</strong>{" "}
                                {selectedPartner.targetAudience}
                            </p>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "10px",
                            }}
                        >
                            <p
                                style={{
                                    flex: "1",
                                    marginRight: "20px",
                                }}
                            >
                                <strong>Contact:</strong>{" "}
                                {`${selectedPartner.contactInfo.name} (${selectedPartner.contactInfo.email})`}
                            </p>
                            <p
                                style={{
                                    flex: "1",
                                    marginRight: "20px",
                                }}
                            >
                                <strong>Website:</strong>{" "}
                                <a
                                    href={selectedPartner.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {selectedPartner.website}
                                </a>
                            </p>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "10px",
                            }}
                        >
                            <p
                                style={{
                                    flex: "1",
                                    marginRight: "20px",
                                }}
                            >
                                <strong>Address:</strong>{" "}
                                {selectedPartner.address}
                            </p>
                        </div>
                        <div
                            style={{
                                marginBottom: "10px",
                            }}
                        >
                            <strong>Description:</strong>{" "}
                            {selectedPartner.description}
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCloseModal}
                            style={{
                                marginTop: "10px",
                            }}
                        >
                            Close
                        </Button>
                    </div>
                )}
        </div>
    );
};

export default DashboardDetail;
