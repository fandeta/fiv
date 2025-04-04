
import "./article.css"
import ScrollToTop from "../scrollToTop/scrollToTop";
import CodeBlock from "./CodeBlock";
import Header from "./shared/header"
import Auther from "./shared/auther"
import Aside from "./shared/aside"
import ArticlePart from "./shared/articlePart"
import Footer from "./shared/footer"


export default function XSS() {
  return (
    <>
      <ScrollToTop/> {/* Scroll To Top Button */}
      <Header articleName="SSRF" LabName="SSRF Labs"/>
      <Auther autherName="Waleed Sameer" readTime="5" imageSrc="/imgs/hacker.png"><span>S</span>erver <span>S</span>ide <span>R</span>equest <span>F</span>orgery</Auther>
      <Aside/>
      <ArticleContent/>
    </>
  )
}

function ArticleContent() {
  return (
      <>
        <article>
          <ArticlePart className="bug-definition">
            <h4>1. What's The SSRF Vulnerability ?</h4>
            <div>
              <p>
                - Server-Side Request Forgery (SSRF) is a web security vulnerability <b>where an attacker manipulates a server into making unintended requests to internal or external resources.</b>
                <br />
                This can allow access to sensitive data, internal services, or even remote code execution in some cases.
              </p>
              <br />
              <p>
                - Imagine you ask your friend to fetch a toy from a locked room,
                and they do it without checking if they're allowed inside.
                <br />
                <b>- You trick them into bringing you something valuable from inside the room.</b>
              </p>
              <br />
              <p>
                <b># Real World Example : </b>
                <br />
                If There's a web application has a feature where users can enter a URL to fetch an external image:
              </p>
              <CodeBlock language={"text"} code={`https://example.com/fetch?url=http://external-site.com/image.png`}/>
              <p>Now, The attacker Can changes the URL to an internal resource Like this : </p>
              <CodeBlock language={"text"} code={`https://example.com/fetch?url=http://localhost/admin`}/>
              <p>If the server doesn't properly validate the request, it may fetch and expose sensitive internal data!</p>
            </div>

          </ArticlePart>
          <ArticlePart className="when-happens">
            <h4>2. When and Why Does SSRF Happen?</h4>
            <div>
              <p><b># SSRF happens when :</b></p>
              <ul>
                <li>A web application allows users to input URLs for fetching data but does not properly validate or restrict them.</li>
                <li>Internal systems and cloud services Like (AWS) are accessible from the server</li>
                <li>When The server has excessive permissions and can access sensitive internal networks.</li>
              </ul>
            </div>

          </ArticlePart>
          <ArticlePart className="risks-impact">
            <h4>3. What's The Risk and Impact of SSRF ?</h4>
            <div>
              <p><b>1. Internal Network Exposure - Attackers can access private servers or databases.</b></p>
              <br />
              <p><b>2. Sensitive Information Disclosure - Extract credentials, API keys, etc ..</b></p>
              <br />
              <p><b>3. Port Scanning - Attackers can determine which services are running inside the internal network.</b></p>
              <br />
              <p><b>4.  Remote Code Execution (<i>In Some Cases</i>) - If combined with another vulnerability, SSRF can lead to full system compromise.</b></p>
              <br />
              <br />
              <p>
                <b># The Biggest Real-Life Example : </b>
                <br />
                <br />
                <i>"Capital One Company Data Breach in 2019 - A misconfigured AWS service allowed an attacker to use SSRF 
                to access AWS metadata, stealing personal and financial data of over 100 million users."</i>
              </p>
            </div>

          </ArticlePart>
          <ArticlePart className="real-exploitation">
            <h4>4. What're Real Scenarios and Exploitation Examples ?</h4>
            <div>
              <ul>
                <li>
                  <b>Accessing Internal Services</b>
                  <br />
                  <p>A website has an image-fetching feature:</p>
                  <CodeBlock language={"http"} code={`GET /fetch?url=http://example.com/image.jpg HTTP/1.1`}/>
                  <p>An attacker changes the URL to:</p>
                  <CodeBlock language={"http"} code={`GET /fetch?url=http://localhost/admin HTTP/1.1`}/>
                </li>
                <br />
                <li>
                  <b>Extracting AWS Metadata (Cloud Exploitation)</b>
                  <br />
                  <p>Many cloud services provide metadata APIs for internal use. If an SSRF vulnerability exists, an attacker can request:</p>
                  <CodeBlock language={"http"} code={`GET /fetch?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/ HTTP/1.1`}/>
                  <p>If successful, this exposes AWS keys, allowing full access to cloud resources.</p>
                </li>
                <br />
                <li>
                  <b>Internal Port Scanning</b>
                  <br />
                  <p>An attacker can use SSRF to scan internal services by changing the URL to different ports:</p>
                  <CodeBlock language={"http"} code={`GET /fetch?url=http://localhost:22 HTTP/1.1\n\nGET /fetch?url=http://localhost:3306`}/>
                </li>
              </ul>
            </div>
          </ArticlePart>
          <ArticlePart className="fix-prevent">
            <h4>5. How to Fix & Secure Your Website ?</h4>
            <div>
              <ul>
                <li><b> Restrict External Requests (Allowlist Approach)</b></li>
                <p>Only allow requests to trusted domains and block internal/private IP addresses.</p>
                <br />
                <li><b> Use URL Validation</b></li>
                <p>Reject non-HTTP(S) URLs and prevent redirections to unknown locations.</p>
                <br />
                <li><b> Disable Unnecessary Server Permissions</b></li>
                <p>Prevent the web server from accessing internal systems it doesn't need.</p>
                <br />
                <li><b> Block Requests to Private IP Ranges</b></li>
                <p>Filter out private IP addresses (e.g., 127.0.0.1, 192.168.1.1) to prevent internal access.</p>
                <br />
                <li><b> Use Metadata API Restrictions (For Cloud Services)</b></li>
                <p>For AWS, block access to instance metadata from web applications using:</p>
                <CodeBlock language={"zsh"} code={`iptables -A OUTPUT -d 169.254.169.254 -j DROP`}/>
              </ul>
            </div>
          </ArticlePart>
          <ArticlePart className="conclusion-resources">
          <h4>- The Conclusion & Additional Resources</h4>
          <div>
            <p>
              SSRF is a critical vulnerability that allows attackers to abuse server-side requests for internal reconnaissance,
              data exposure, and in some cases, remote code execution.
            </p>
            <br />
            <p>developers must restrict external requests, block internal IPs, validate URLs, and apply strict security policies.</p>
            <br/>
            <h3>Additional Resources</h3>
            <ul>
              <li>
                <b>
                  <a href="https://portswigger.net/web-security/all-labs#server-side-request-forgery-ssrf" 
                    target="_blank"
                    style={{color: "#2626f8",textDecoration: "underline"}}
                    >Portswigger SSRF Labs</a>
                  </b>
              </li>
              <li>
                <b>
                  <a href="https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html" 
                    target="_blank"
                    style={{color: "#2626f8",textDecoration: "underline"}}
                    >OWASP - SSRF Prevention Cheat Sheet</a>
                  </b>
              </li>
              <li>
                <b>
                  <a href="https://portswigger.net/web-security/ssrf" 
                    target="_blank"
                    style={{color: "#2626f8",textDecoration: "underline"}}
                    >PortSwigger SSRF Guide</a>
                  </b>
              </li>
              <li>
                <b>
                  <a href="https://www.google.com/search?q=bug+bounty+reports+on+ssrf+intitle+medium" 
                    target="_blank"
                    style={{color: "#2626f8",textDecoration: "underline"}}
                    >Bug Bounty Reports</a>
                  </b>
              </li>
            </ul>
          </div>
          </ArticlePart>
          <ArticlePart className="good-bye">
          <h4>🟡 Last but not Least!</h4>
          <div>
            <p style={{fontWeight: "bold"}}>"Think like an attacker, defend like a guardian! The best security expert is the one who never stops learning! "</p>
            <br/>
            <p style={{color: "var(--main-color)", fontFamily: 'heading-font',fontWeight: "bold"}}>
              <a href="https://facebook.com/fandeta7"
              target="_blank"
              style={{color: "var(--main-color)", textDecoration: "underline"}}>Fandeta</a> was here!</p>
          </div>
          </ArticlePart>
        </article>
        <Footer/>
      </>
  )
}

