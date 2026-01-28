import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Hr,
  Link,
} from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
}

export const WelcomeEmail: React.FC<Readonly<WelcomeEmailProps>> = ({
  name,
}) => (
  <Html>
    <Head />
    <Preview>Welcome to World Quantum Network</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading
            as="h1"
            style={{
              ...h1,
              color: "#1a1a1a",
              fontWeight: "bold",
              margin: 0,
              fontSize: "24px",
              lineHeight: "24px",
              textAlign: "center",
            }}
          >
            World Quantum Network
          </Heading>
        </Section>
        <Hr style={hr} />
        <Section style={content}>
          <Text style={text}>Hello {name},</Text>
          <Text style={text}>
            Welcome to World Quantum Network, the digital bank for your crypto
            assets. We're honored to have you join us. You've now secured a
            front-row seat to the future of finance, where the security of a
            Swiss vault meets the absolute freedom of the blockchain.
          </Text>
          <Text style={text}>
            Our institutional-grade banking infrastructure is now at your
            service, providing a secure bridge between traditional finance and
            the decentralized world. Whether you're managing digital wealth or
            exploring new DeFi horizons, you're backed by quantum-secure
            protocols and ISO20022 compliance.
          </Text>
          <Text style={text}>
            Your dashboard is ready. Log in now to experience instant settlement
            and world-class asset management.
          </Text>
          <Text style={text}>
            If you have any questions or require assistance with your account,
            our support team is available 24/7 at
            support@worldquantumnetwork.com.
          </Text>
          <Text style={text}>
            Best regards,
            <br />
            The World Quantum Network Team
          </Text>
        </Section>
        <Hr style={hr} />
        <Section style={footer}>
          <Text style={footerText}>
            © {new Date().getFullYear()} World Quantum Network. All rights
            reserved.
          </Text>
          <Link href="https://worldquantumnetwork.com" style={footerLink}>
            worldquantumnetwork.com
          </Link>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  border: "1px solid #f0f0f0",
  borderRadius: "4px",
};

const header = {
  padding: "20px",
  textAlign: "center" as const,
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const content = {
  padding: "0 20px",
};

const h1 = {
  color: "#1a1a1a",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "40px",
  margin: "0 0 20px",
};

const text = {
  color: "#333333",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "0 0 20px",
};

const footer = {
  padding: "0 20px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#666666",
  fontSize: "12px",
  lineHeight: "24px",
};

const footerLink = {
  color: "#1a1a1a",
  textDecoration: "underline",
};
