import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
const Footer = ({ footer }: { footer?: number | undefined }) => {
    return (
        <div
            id="footer"
            style={{
                backgroundColor: "#EFF2F5",
                color: "#212B35",
                fontSize: "0.7rem",
            }}
        >
            <hr />
            <Row style={{ padding: "30px" }}>
                <Col lg="1" sm="6">
                    <div style={{ marginTop: "10px" }}>
                        <b>Talus Leong</b>
                        <br />
                    </div>
                    <div style={{ marginTop: "8px" }}>
                        <b>Ryan Xia</b>
                    </div>
                    <div style={{ marginTop: "8px" }}>
                        <b>Elizabeth Qin</b>
                    </div>
                </Col>
                <Col lg="3" sm="6">
                    <div style={{ marginTop: "10px" }}>
                        Lead Developer
                        <br />
                    </div>
                    <div style={{ marginTop: "8px" }}>
                       Developer and Graphical Designer
                    </div>
                    <div style={{ marginTop: "8px" }}>
                        Developer
                    </div>
                </Col>
                <Col lg="3" sm="6"></Col>
                {footer && footer !== 4 && <Col lg="3" sm="6"></Col>}
            </Row>
            <Row style={{ padding: "10px" }}>
                <Col sm="12" md="7" style={{ padding: "10px" }}>
                    <img
                        src="/images/logo.png"
                        height={17}
                        width={80}
                        style={{ margin: "-5px 5px 0px 15px" }}
                        alt="footer-logo"
                    />{" "}
                    All rights reserved, MVFBLA© {new Date().getFullYear()}
                </Col>
            </Row>
        </div>
    );
};

export default Footer;
