
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
      <Header articleName="CSRF" LabName="CSRF Labs"/>
      <Auther autherName="Waleed Sameer" readTime="5" imageSrc="/imgs/hacker.png"><span>C</span>ross <span>S</span>ite <span>R</span>equest <span>F</span>orgery</Auther>
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
            <h4>1. What's The CSRF Vulnerability?</h4>
            <div>
              <p>- Cross-Site Request Forgery (CSRF) is a web security vulnerability that <b>forces an authenticated user
              to unknowingly perform unintended actions on a web application.</b>
                <br />
                <br />
                - <b>Attackers exploit this flaw to execute unwanted operations on behalf of the victim,</b> often leading to unauthorized actions
                such as transferring funds, changing account settings, or even deleting data.
              </p>
              <br />
              <p>- <i style={{fontWeight:"bold"}}>Imagine you're playing an online game, and your friend tricks you into clicking a button that,
                without you knowing, sends all your in-game money to them. You didn't mean to do it,
                but the game thought you did.</i>
              </p>
              <br />
              <p>
                For Instance : 
              </p>
              <CodeBlock language={"html"} code={`<a href="https://bank.com/transfer?amount=5000&to=attacker">Click here!</a>`}/>
            </div>
          </ArticlePart>
          <ArticlePart className="when-happens">
            <h4>2. When and Why Does CSRF Happen?</h4>
            <div>
              <p>CSRF occurs when:</p>
              <ul>
                <li>Web application relies only on cookies for authentication <b>without additional verification Like (CSRF Tokens)</b></li>
                <li>There are no origin checks or additional confirmation steps such as (Multi-factor authentication)</li>
                <li>Websites do not use proper security headers like <b>(SameSite)</b></li>
                <li>Using GET Method in Sensitive Operations Like <b>Change (Emails, Password, etc..)</b></li>
              </ul>
            </div>
          </ArticlePart>
          <ArticlePart className="risks-impact">
            <h4>3. What's The Risks and Impact of CSRF?</h4>
            <div>
              <p> CSRF attacks depend on the nature of the vulnerable application. Some common risks include:</p>
              <ul>
                <li>Financial Loss - <b>Attackers can initiate money transfers or unauthorized purchases.</b></li>
                <li>Account Takeover - <b>Changing passwords or email addresses without user consent.</b></li>
                <li> Sensitive Data Exposure - Attackers might change privacy settings or leak information.</li>
                <li>Service Disruption - Unwanted actions like deleting accounts or modifying important settings.</li>
              </ul>
            </div>
          </ArticlePart>
          <ArticlePart className="real-exploitation">
            <h4>4. What're Real Scenarios and Exploitation Examples?</h4>
            <div>
              <p><b>1. Changing Email Address</b> Usually Happens at Low Security Websites</p>
              <CodeBlock language={"http"} code={`POST /change_email HTTP/1.1\nHost: vulnerable.com\nCookie: session=fandeta123\nContent-Type: application/x-www-form-urlencoded\n\nemail=hacker@example.com`}/>
              <p><b>An attacker can trick a logged-in user into clicking a malicious link or loading an image like this:</b></p>
              <CodeBlock language={"html"} code={`<img src="https://vulnerable.com/change_email?email=hacker@example.com">`}/>
              <p>If the user is logged in, their email gets changed to the attacker's email without their knowledge.</p>
              <br />
              <p><b>2. Transferring Money (Banking Application)</b></p>
              <p>If The Bank Web Application transfer feature like this:</p>
              <CodeBlock language={"http"} code={`POST /transfer HTTP/1.1\nHost: bank.com\nCookie: session=secureToken\nContent-Type: application/x-www-form-urlencoded\n\namount=1000&to=attackerAccount`}/>
              <p>An attacker can embed this request into an invisible form and trick the user into submitting it or make it automaticly submited:</p>
              <CodeBlock language={"html"} code={`<form hidden action="https://bank.com/transfer" method="POST" >\n  <input type="hidden" name="amount" value="1000">\n  <input type="hidden" name="to" value="attackerAccount">\n  <input type="submit" value="Claim your reward!">\n</form>\n\n<script>\n  window.onload=function() {\n    document.forms[0].click()\n  }\n</script>`}/>
              <p><b>When Page is Loaded, the form will submits, transferring money without their consent.</b></p>
            </div>
          </ArticlePart>
          <ArticlePart className="fix-prevent">
            <h4>5. How to Fix & Secure Your Website ?</h4>
            <div>
              <p>
                <b>1. Use CSRF Tokens</b>
                <br />
                - Example of CSRF token implementation:
              </p>
              <CodeBlock language={"html"} code={`<input type="hidden" name="csrf_token" value="randomlyGeneratedToken">`}/>
              <br />
              <p>
                <b>2. Enforce SameSite Cookies:</b>
                <br />
                - Using the <b>SameSite</b> attribute in cookies can prevent CSRF attacks:
              </p>
              <CodeBlock language={"http"} code={`Set-Cookie: session=secureToken; HttpOnly; Secure; SameSite=Strict`}/>
              <p><b>This ensures cookies are not sent with cross-site requests.</b></p>
              <br />
              <p><b>3. Implement CORS Restrictions:</b></p>
              <CodeBlock language={"http"} code={`Access-Control-Allow-Origin`}/>
              Using That Header <b> to limit which domains can interact with your application.</b>
              <br />
              <br />
              <p>
                <b>4. Require Re-Authentication for Critical Actions:</b>
                <br />
                <br />
                - For actions like <b>changing email or transferring money</b>,
                ask the user to enter their password or use multi-factor authentication.
              </p>
            </div>
          </ArticlePart>
          <ArticlePart className="conclusion-resources">
          <h4>- The Conclusion & Additional Resources</h4>
          <div>
            <p>CSRF is a serious vulnerability that exploits user trust and session authentication mechanisms.
              Attackers can force victims to unknowingly perform actions that can lead to financial loss, data breaches, or account hijacking.
            </p>
            <br />
            <p>Mitigating CSRF requires implementing security best practices such as CSRF tokens, SameSite cookies, and user authentication measures.</p>
            <br />
            <h3>Additional Resources</h3>
            <ul>
              <li>
                <b>
                  <a href="https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html" 
                    target="_blank"
                    style={{color: "#2626f8",textDecoration: "underline"}}
                    >OWASP - CSRF Prevention Cheat Sheet</a>
                  </b>
              </li>
              <li>
                <b>
                  <a href="https://portswigger.net/web-security/all-labs#cross-site-request-forgery-csrf" 
                    target="_blank"
                    style={{color: "#2626f8",textDecoration: "underline"}}
                    >PortSwigger Labs</a>
                  </b>
              </li>
              <li>
                <b>
                  <a href="https://portswigger.net/web-security/csrf" 
                    target="_blank"
                    style={{color: "#2626f8",textDecoration: "underline"}}
                    >PortSwigger CSRF Guide</a>
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

