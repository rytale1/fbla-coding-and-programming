import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
const Footer2 = ({ footer }: { footer?: number | undefined }) => {
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
                <Col lg="3" sm="6">
                    <div style={{ marginTop: "10px" }}>
                        <b>bing bong</b>
                        <br />
                    </div>
                    <div style={{ marginTop: "8px" }}>
                        <a href="/">ching chong</a>
                    </div>
                    <div style={{ marginTop: "8px" }}>
                        <a href="/">ding dong</a>
                    </div>
                </Col>
                <Col lg="3" sm="6">
                    <div style={{ marginTop: "10px" }}>
                        <b>abc</b>
                        <br />
                    </div>
                    <div style={{ marginTop: "8px" }}>
                        <a href="/">def</a>
                    </div>
                    <div style={{ marginTop: "8px" }}>
                        <a href="/">ghi</a>
                    </div>
                </Col>
                <Col lg="3" sm="6"></Col>
                {footer && footer !== 4 && <Col lg="3" sm="6"></Col>}
            </Row>
            <Row style={{ padding: "10px" }}>
                <Col sm="12" md="7" style={{ padding: "10px" }}>
                    <img
                        src="/images/logo192.png"
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

export default Footer2;
