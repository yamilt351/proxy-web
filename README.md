# web-proxy

- [What is a web proxy?](What-is-a-web.proxy?)
   - [Why you should use a web proxy?](Why-you-should-use-a-web-proxy?)
   - [Diferences between web proxy & Vpns](Diferences-between-web-proxy-&-Vpns)
   - [Web Proxy weakness](Web-Proxy-weakness)
- [About this project](About-this-project)
## What is a web proxy?

- A web proxy is an intermediary server that acts as a link between the client and web server. Its main function is to intercept client requests and send them to the appropriate web server, and then send server responses back to the client.

  There are different types of web proxies, such as transparent proxies, anonymous proxies, and high anonymity proxies. Transparent proxies do not hide the client's IP address, while anonymous and high anonymity proxies do.

  Web proxies have several advantages, such as the ability to improve browsing speed by using caching, protect user privacy by hiding their IP address, and allow access to websites that may be blocked in the user's location.

  According to the World Wide Web Consortium (W3C) documentation, a proxy is "an agent that acts on behalf of another, especially when it comes to requests or responses between client and server computer networks" [1]. The book "HTTP: The Definitive Guide" by David Gourley and Brian Totty defines a proxy as "an intermediary server that acts as a point of contact between clients and web servers" [2].

- References:
  [1] World Wide Web Consortium (W3C). (2004). Glossary of Terms for Device Independence. Retrieved from https://www.w3.org/TR/di-gloss/
  [2] Gourley, D., & Totty, B. (2002). HTTP: The Definitive Guide. O'Reilly Media, Inc.
![proxy-diagram](https://user-images.githubusercontent.com/88646148/236625471-8d3cbc0e-3376-46b1-bb29-bdff25cb1a40.png)

## Why you should use a web proxy?

  The internet has become an essential part of our lives, allowing us to connect with people from all over the world and access a wealth of information with just a few clicks. However, this convenience comes at a cost - the loss of privacy.

  Many websites and online services track our activities and collect data about us, including our browsing history, search queries, and personal information. This data can be used for targeted advertising, identity theft, and even surveillance by governments and other organizations.

  One way to protect our privacy online is by using a proxy server. A proxy acts as an intermediary between our device and the internet, routing our requests through a different IP address and encrypting our data. This makes it more difficult for websites and other parties to track our activities and identify our location.

There are several types of proxies, including:

 - Web proxies: These are online services that allow us to access the internet through a different IP address. They are easy to use and require no installation, but they can be slow and may not provide the same level of security as other types of proxies.

  - VPNs: Virtual Private Networks are a popular option for privacy-conscious users. They create a secure tunnel between our device and a remote server, encrypting our data and masking our IP address. VPNs are more secure than web proxies, but they can be more expensive and may slow down our internet connection.

  - SOCKS proxies: These are similar to web proxies, but they can be used for any type of traffic, not just web browsing. They are more flexible than web proxies but may require more technical knowledge to set up and use.

  Using a proxy can help us protect our privacy online, but it's important to choose the right type of proxy for our needs. We should also be aware that proxies are not foolproof - determined adversaries may still be able to identify us or intercept our data. However, by using a proxy, we can take an important step towards protecting our online privacy.

- References:

  - Electronic Frontier Foundation. (n.d.). Surveillance Self-Defense. Retrieved from https://ssd.eff.org/en
  - Shariq, M. A. (2020). A Survey on Proxy Servers: Types, Implementations, Advantages, and Disadvantages. International Journal of Computer Applications, 179(41), 9-16. https://doi.org/10.5120/ijca2020920526
  - "Proxy server" en Wikipedia: https://en.wikipedia.org/wiki/Proxy_server
  - "Why you need a proxy server in 2021" de TechRadar: https://www.techradar.com/news/why-you-need-a-proxy-server-in-2021
  - "Why use a proxy server? 8 reasons to do so" de Norton: https://us.norton.com/internetsecurity-privacy-why-use-a-proxy-server-8-reasons-to-do-so.html

## Diferences between web proxy & Vpns

Web proxies and VPNs are both tools that can be used to enhance online privacy and security. However, they operate in different ways and have distinct advantages and disadvantages.

Web proxies are intermediary servers that act as a gateway between the user and the internet. They intercept all network traffic and can be used to modify or filter it. When a user makes a request to access a website through a web proxy, the request is first sent to the proxy server, which then forwards it to the website. The website's response is then sent back to the proxy server, which forwards it to the user. Web proxies can be configured to block ads, scripts, and other forms of content that may be considered harmful or undesirable. They can also be used to bypass internet censorship and access blocked websites.

VPNs, on the other hand, create an encrypted tunnel between the user's device and a remote server. When the user connects to the internet through a VPN, all network traffic is routed through this tunnel, preventing anyone from intercepting or eavesdropping on the user's activity. This makes VPNs particularly useful for protecting sensitive data such as online banking transactions or personal information.

One key difference between web proxies and VPNs is that web proxies are generally easier to set up and use, as they do not require any software to be installed. Users can simply enter the URL of the proxy server into their browser and start browsing. VPNs, on the other hand, typically require software to be installed on the user's device, and may require more advanced technical knowledge to set up.

Another difference is that web proxies only intercept traffic that is sent through the browser, while VPNs can intercept all network traffic, including that sent through other applications such as email clients and online gaming platforms.

In terms of privacy and security, VPNs are generally considered to be more robust than web proxies. The encryption provided by VPNs makes it more difficult for anyone to intercept or monitor the user's online activity. However, this added security comes at a cost: VPNs can be slower than web proxies due to the extra processing required for encryption and decryption.

- References:

  - "What Is a VPN, and Why Would I Need One?" - How-To Geek
  - "Proxy vs VPN: Which is Right for Me?" - NordVPN
