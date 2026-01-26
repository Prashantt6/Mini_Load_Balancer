# Mini Load Balancer

Mini Load Balancer is a lightweight load balancing system built using **consistent hashing**.  
This project is created to understand **system design concepts** more deeply by implementing them practically instead of only studying theory.

The load balancer works by hashing all backend servers and placing them on a **hash ring**.  
Each incoming client request is also hashed and routed to the **next clockwise server** on the ring, ensuring efficient and stable request distribution even when servers are added or removed.

This project focuses on learning how real-world load balancers minimize re-routing, maintain scalability, and handle distributed systems effectively.

## How It Works

1. All backend servers are first **hashed and placed on a consistent hash ring** when the load balancer starts.

2. The **load balancer server runs on port `8000`** and acts as the single entry point for all client requests.

3. When a client sends a request, it is **first received by the load balancer**.

4. The request key is then **hashed**, and this hash value is used to locate the **next clockwise server** on the hash ring.

5. Once the target server is determined, the load balancer uses **`http-proxy`** to **forward the incoming request** to the selected backend server URL.

6. The backend server processes the request and sends the response back through the load balancer to the client.

This approach ensures efficient request distribution while minimizing remapping when servers are added or removed.

## Project Structure

```text
.
├── .github/
├── loadbalancer/
│   ├── lb-algorithm/
│   │   └── consistentHashing.ts
│   └── loadBalancerServer.ts
├── src/
│   └── routes/
├── servers/
│   ├── server1.ts
│   ├── server2.ts
│   └── server3.ts
├── node_modules/
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```
---
## Technologies Used

- **TypeScript** – Used for type safety, better code structure, and maintainability.
- **Node.js** – Runtime environment for building the server-side application.
- **Express.js** – Used to create the load balancer server and backend servers.
- **http-proxy** – Used to forward incoming client requests from the load balancer to the selected backend server.
---
## How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/Prashantt6/Mini_Load_Balancer.git
   ```
2. Navigate to the project directory and install dependencies:
    ```bash 
    npm install 
    ```
3. Run the program:
    ``bash 
    npm start
    ```
---
  

