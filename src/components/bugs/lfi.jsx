
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
      <Header articleName="Local File Inclusion" LabName="Local File Inclusion Labs"/>
      <Auther autherName="Waleed Sameer" readTime="5" imageSrc="/imgs/hacker.png"><span>L</span>ocal <span>F</span>ile <span>I</span>nclusion</Auther>
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
            <h4>1. What's The Local File Inclusion Vulnerability?</h4>
            <div>
              <p>
                Local File Inclusion (LFI) is a web vulnerability that allows an attacker to include local files from the web server's filesystem into a web application.
                <br />
                <br />
                This can lead to <b>information disclosure, code execution,</b> and even a <b>full server compromise if exploited properly.</b>
              </p>
              <br />
              <p>
                Imagine a magic book that can display any story you ask for.
                But, instead of just showing fairytales, it lets you <b>open any page from your school's secret notes!</b>
                That's LFI tricking the website into showing hidden files.
              </p>
              <br />
              <p>
                <b>Real Life Example : </b>
                <br />
                If The web application load pages dynamically Like this : 
              </p>
              <CodeBlock language={"php"} code={`<?php\n  include($_GET["page"])\n?>`}/>
              <p>Now, The hacker can abuse this by passing : </p>
              <CodeBlock language={"url"} code={`http://example.com/index.php?page=../../../../etc/passwd`}/>
              <p>
                The 
                  <span className="highlighted">/etc/passwd</span>
                Is a critical Linux file containing all user account information.
              <br />
              <br />
                <b># That's How The LFI Attack Works!</b>
              </p>
            </div>
          </ArticlePart>
          <ArticlePart className="when-happens">
            <h4>2. When and Why Does Local File Inclusion Happen?</h4>
            <div>
              <p><b>LFI occurs when : </b></p>
              <ul>
                <li>
                  User controlled input (like a file path) <b>is directly included</b> in a PHP 
                  <span className="highlighted">include()</span>, 
                  <span className="highlighted">require()</span>,
                  or <b>similar function</b>.
                </li>
                <li>
                  The application <b>does not properly Filter user input.</b>
                </li>
                <li>
                  The web server <b>does not have strict file access permissions.</b>
                </li>
              </ul>
            </div>
          </ArticlePart>
          <ArticlePart className="risks-impact">
            <h4>3. What're The Risks and Impact of Local File Inclusion?</h4>
            <div>
              <p>The Risks of LFI Attack Can be : </p>
              <ul>
                <li>Information Disclosure, by reading Files like Those : 
                  <CodeBlock language={"bash"} code={"/etc/passwd #Linux - This File have All Users Inside"}/>
                  <CodeBlock language={"bash"} code={"C:\\Windows\\System32\\config\\SAM #Windows - Stores hashed Windows user passwords (But requires SYSTEM privileges)\n\nC:\\Windows\\System32\\config\\SYSTEM # Windows - Contains Windows system configuration details"}/>
                </li>
                <li>
                  <b>Log Poisoning to Code Execution</b>, The Hacker can inject PHP code into logs and execute it via LFI.
                  <br />
                  <br />
                  - This Can happens If The Logs Save The User-Agent Of The Visitor, According on That The Hacker Can Change His User-Agent To PHP Code.
                  <br />
                  <br />
                  Like This : 
                  <CodeBlock language={"http"} code={`GET /page=/etc/passwd HTTP/2\nHOST: fandeta.site\nUser-Agent: <?php system($_GET["command"]); ?>\n`}/>
                  or Just Use : 
                  <CodeBlock language={"bash"} code={`curl -A "<?php system('whoami'); ?>" http://fandeta.site`} />
                  <p>Now, Hacker Can Use <b>LFI</b> To Access The Log File and Execute Commands on the system.</p>
                </li>
                <li><b>Privilege Escalation </b>, In Some Cases, Combined with weak file permissions, LFI can lead to Remote Code Execution (RCE).</li>
              </ul>
            </div>
          </ArticlePart>
          <ArticlePart className="real-exploitation">
            <h4>4. What're Real Scenarios and Exploitation Examples?</h4>
            <div>
              <p><b>1. Reading Sensitive Files</b></p>
              <CodeBlock language={"bash"} code={`/etc/passwd #All Users In Linux\n/etc/shadow #Password Hashes - Usually not accessable to Regualr Users!\n\nC:\\Windows\\System32\\config\\SYSTEM # Windows - Contains system configuration details`}/>
              <p>
                They're Many Sensitive files in both operating system. 
                <br />
                - <a 
                  href="https://raw.githubusercontent.com/InfoSecWarrior/Offensive-Payloads/refs/heads/main/Windows-Sensitive-Files.txt"
                  style={{color: "#2626f8",textDecoration: "underline"}}
                  target="_blank" >Windows.</a>
                  <br />
                - <a href="https://raw.githubusercontent.com/InfoSecWarrior/Offensive-Payloads/refs/heads/main/Linux-Sensitive-Files.txt" 
                  style={{color: "#2626f8",textDecoration: "underline"}}
                  target="_blank">Linux.</a>
              </p>
              <br />
              <p>
                <b>2. Log Poisoning ( <i>LFI to RCE </i> )</b>
                - Inject a malicious PHP payload into the logs:
              </p>
              <CodeBlock language={"bash"} code={`curl -A "<?php system('whoami'); ?>" http://fandeta.site/`}/>
              - Now, Access the log file via LFI:
              <CodeBlock language={"url"} code={`http://example.com/index.php?page=/var/log/apache2/access.log`}/>
              - If The Log Files I Poisoned Will show The Current User (Usually will be 
              <span className="highlighted">www-data</span> or <span className="highlighted">nobody</span>)
            </div>
          </ArticlePart>
          <ArticlePart className="fix-prevent">
            <h4>5. How to Fix & Secure Your Website ?</h4>
            <div>
              <p>
                <b>1. Use Whitelist Of Allowed Files.</b>
              </p>
                <CodeBlock language={`php`} code={`$allowed_pages = ['home.php', 'about.php'];\n\nif (!in_array($_GET['page'], $allowed_pages)) {\n\n  die("Access Denied!");\n\n}`}/>
              <br />
              <p>
                <b>2. Don't Direct File Inclusion.</b>
              </p>
                <CodeBlock language={`php`} code={`include("pages/" . basename($_GET['page']));  `}/>
              <br />
              <p>
                <b>3. Use <span className="highlighted">realpath()</span> to Restrict Path Traversal</b>
              </p>
                <CodeBlock language={`php`} code={`$file = realpath("pages/" . $_GET['page']);  \n\nif (strpos($file, realpath("pages/")) !== 0) {\n\n  die("Invalid file!");  \n\n} `}/>
              <br />
              <p>
                <b>4. Disable Dangerous PHP Functions in <span className="highlighted">php.ini</span></b>
              </p>
                <CodeBlock language={`ini`} code={`disable_functions = "system, shell_exec, exec, passthru, popen, proc_open"`}/>
              <br />
            </div>
          </ArticlePart>
          <ArticlePart className="conclusion-resources">
          <h4>- The Conclusion & Additional Resources</h4>
          <div>
            LFI is a powerful vulnerability that can escalate to full system compromise if combined with log poisoning,
            upload misconfigurations, or weak security measures.
            <br />
            Always <b>filter inputs</b>, <b>validate file paths</b>, and <b>restrict inclusion sources</b> to mitigate LFI risks.
            <br/>
            <br/>
            <h3>Additional Resources</h3>
            <br/>
            <ul>
              <li>
                <b>
                  <a href="hhttps://portswigger.net/web-security/all-labs#path-traversal" 
                    target="_blank"
                    style={{color: "#2626f8",textDecoration: "underline"}}
                    >Portswigger - LFI & Path Traversal Labs</a>
                  </b>
              </li>
              <li>
                <b>
                  <a href="https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/07-Input_Validation_Testing/11.1-Testing_for_Local_File_Inclusion" 
                    target="_blank"
                    style={{color: "#2626f8",textDecoration: "underline"}}
                    >OWASP - Local File Inclusion</a>
                  </b>
              </li>
              <li>
                <b>
                  <a href="https://www.google.com/search?q=bug+bounty+reports+on+local+file+inclusion+intitle+medium" 
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
