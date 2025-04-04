
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
      <Header articleName="Path Traversal" LabName="Path Traversal Labs"/>
      <Auther autherName="Waleed Sameer" readTime="5" imageSrc="/imgs/hacker.png"><span>Path</span> <span>Traversal</span></Auther>
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
            <h4>1. What's The Path Traversal Vulnerability?</h4>
            <div>
              <p>- Path Traversal <b>(also called Directory Traversal) </b>is a web security vulnerability that allows an attacker to access files
                and directories that are outside the web root folder. By manipulating file paths, an attacker can read sensitive files .
                <br />
                <br />
                - Imagine you're inside a house and supposed to stay in your room,
                but you find a secret tunnel that lets you crawl to other rooms—even the locked ones where important stuff is kept!
              </p>
              <br />
              <p>
                <b>- In Real World Scenarios Path Traversal Can happens Like this : </b>
                <br />
                If The website allows users to download Their Certificates by requesting:
              </p>
              <CodeBlock language={"text"} code={`https://example.com/download?file=certificate.pdf`}/>
              <p>Now, The Hacker Can modifies the parameter to:</p>
              <CodeBlock language={"text"} code={`https://example.com/download?file=../../../../etc/passwd`}/>
              <p>If the server is vulnerable, it will return the system password file!, and its has all users information's on the system. </p>
              <br />
              <p>
                <b>- Also, The Hacker Can manipulating file path and read sensitive files like : </b>
              </p>
                
              <ul>
                <li >System files Like :
                  <CodeBlock language={"bash"} code={`/etc/passwd #Linux`}/>
                  <CodeBlock language={"bash"} code={`C:\\Windows\\System32\\config\\SAM  #Windows`}/>
                </li>
                <li>Application configuration files Like :  
                  <CodeBlock language={"bash"} code={`config.php #Configuration File`}/>
                  <CodeBlock language={"bash"} code={`.env #Configuration File`}/>
                </li>
                <li>Logs Files Like :  
                  <CodeBlock language={"bash"} code={`access.log #Log File`}/>
                  <CodeBlock language={"bash"} code={`error.log #Log File`}/>
                </li>
                <li>
                  <b>All these Files will be targeted based on the hacker thoughts!</b>
                </li>
              </ul>
            </div>
          </ArticlePart>
          <ArticlePart className="when-happens">
            <h4>2. When and Why Does Path Traversal Happen?</h4>
            <div>
              <p>
                <b>Path traversal happens when:</b>
              </p>
              <br />
              <ul>
                <li>A web application allows file access based on user input Like : 
                  <CodeBlock language={"url"} code={`https://site.com?file=xyz.pdf`}/>
                  - Without The Secure validation.
                </li>
                <li>
                  The server does not filter input, allowing  
                  <CodeBlock language={"path"} code={`../`}/>
                  sequences to escape directories.
                </li>
                <li>The application runs with high privileges, allowing access to critical system files.</li>
              </ul>
            </div>
          </ArticlePart>
          <ArticlePart className="risks-impact">
            <h4>3. What's The Risk and Impact of Path Traversal?</h4>
            <div>
              <ul>
                <li>
                  <b>Sensitive Data Exposure</b> - Read private files, credentials, and config files.
                </li>
                <li>
                  <b>User Information Leakage</b> -  Expose user data, session details, and logs.
                </li>
                <li>
                  <b>Application Code Exposure</b> -  Gain access to backend source code.
                </li>
                <li>
                  <b>Server Compromis</b> - If combined with another vulnerability (like file upload or command injection),
                  it could lead to Remote Code Execution (RCE).
                </li>
              </ul>
              <br />
              <p>
                <b># Real Life Example : </b>
                <br />
                <br />
                <b>Sony PlayStation Network Hack (2011)</b> - Attackers exploited <b>path traversal</b> to access internal files
                <br />
                leading to a massive data breach affecting 77 million users.
              </p>
            </div>
          </ArticlePart>
          <ArticlePart className="real-exploitation">
            <h4>4. What're Real Scenarios and Exploitation Examples?</h4>
            <div>
              <p>
                <b>1. Extracting Users, Password Hashes (Linux Servers)</b>
              </p>
              <br />
              <p>
                - If The file download feature is Vulnerable Like this:
              <br />
              </p>
              <ul>
                <li><CodeBlock language={"http"} code={`https://exams.com/download?file=certificate.pdf`}/> </li>
              </ul>
                - Then, <b>hackers Can changes it to show all Exists users</b> In the Linux System :
                <ul>
                  <li>
                    <CodeBlock language={"http"} code={`https://example.com/download?file=../../../../etc/passwd`}/>
                  </li>
                </ul>
                - <b>If The Server Runs with High privileges. Then hackers will be Able to Show The Password Hash of all Exists users</b> In the Linux System :
                <ul>
                  <li>
                    <CodeBlock language={"http"} code={`https://example.com/download?file=../../../../etc/shadow`}/>
                  </li>
                </ul>
              
              <br />
              <p>
                <b>2. Reading Application Configurations.</b>
              </p>
              <br />
              <p>
                - The Web applications often store sensitive credentials in config files.
              </p>
                <ul>
                  <li>
                    <CodeBlock language={"http"} code={`https://example.com/download?file=../../../../var/www/html/.env`}/>
                  </li>
                </ul>
                <b>- This </b>
                <CodeBlock language={"bash"} code={`.env #Sensitive Information`}/>
                <b>file may contain :</b>
                <ul>
                  <li><CodeBlock language={"ini"} code={`DB_USER=admin\nDB_PASS=supersecretpassword`}/></li>
                </ul>
                - Now, the Hacker has <b>database credentials!</b>
              <br />
              <br />
              <p>
                <b>3. Extracting Password Hashes (Windows Servers)</b>
              </p>
              <br />
              <p>
                - If the server is <b>on Windows</b>, an attacker can request:
              </p>
              <br />
              <ul>
                <li><CodeBlock language={"http"} code={`https://exam.com/download?file=../../../../Windows/System32/config/SAM`}/> </li>
              </ul>
                - This file<b> contains Windows user password hashes.</b>
            </div>
          </ArticlePart>
          <ArticlePart className="fix-prevent">
            <h4>5. How to Fix & Secure Your Website ?</h4>
            <div>
              <p>
                <b>1. Use an Absolute Path Instead of User Input ( in PHP )</b>
              </p>
              <ul>
                <li>
                  <CodeBlock language={"php"} code={`$base_dir = realpath("/var/www/html/uploads/"); # Set the allowed directory\n$user_input = basename($_GET['file']); # To Remove directory traversal characters\n\n$file_path = realpath($base_dir . "/" . $user_input);\n\nif ($file_path && strpos($file_path, $base_dir) === 0 && file_exists($file_path)) {\n\n  readfile($file_path); // Now, Serving the file Is safe.\n\n} else {\n\n  die("Unauthorized access!");\n\n}`}/>
                </li>
              </ul>
              <p>
                <b>2. Use Whitelisting (Only Allow Specific Files)</b>
              </p>
              <ul>
                <li>
                  <CodeBlock language={"php"} code={
`$allowed_files = ["certificate.pdf", "exam.pdf"];\n$user_input = basename($_GET['file']);\n\nif (in_array($user_input, $allowed_files)) {\n\n  readfile("/var/www/html/uploads/" . $user_input);\n\n} else {\n\n  die("Unauthorized Accessing File!");\n\n}`
}/>
                </li>
              </ul>
            </div>
          </ArticlePart>
          <ArticlePart className="conclusion-resources">
          <h4>- The Conclusion & Additional Resources</h4>
          <div>
            <p>
              <b>Path Traversal is a serious vulnerability that allows attackers to read sensitive files, steal credentials, and expose application source code.</b>
              <br />
              <br />
              To prevent it, developers must properly sanitize user input, restrict file access, and enforce strict security policies.
            </p>
            <br/>
            <h3>Additional Resources</h3>
            <br/>
            <ul>
              <li>
                <b>
                  <a href="https://portswigger.net/web-security/all-labs#path-traversal" 
                    target="_blank"
                    style={{color: "#2626f8",textDecoration: "underline"}}
                    >Portswigger - Path Traversal Labs</a>
                  </b>
              </li>
              <li>
                <b>
                  <a href="https://owasp.org/www-community/attacks/Path_Traversal" 
                    target="_blank"
                    style={{color: "#2626f8",textDecoration: "underline"}}
                    >OWASP - Path Traversal Guide</a>
                  </b>
              </li>
              <li>
                <b>
                  <a href="https://portswigger.net/web-security/file-path-traversal" 
                    target="_blank"
                    style={{color: "#2626f8",textDecoration: "underline"}}
                    >PortSwigger - Path Traversal Guide</a>
                  </b>
              </li>
              <li>
                <b>
                  <a href="https://www.google.com/search?q=bug+bounty+reports+on+path+traversal+intitle+medium" 
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

