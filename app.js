// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   getDocs,
//   doc,
//   deleteDoc,
//   updateDoc,
//   deleteField,
// } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
// } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyAIWuHp4frQWkbDSr_7tJqLiFYdpWQcZdM",
//   authDomain: "pakfood-1d336.firebaseapp.com",
//   projectId: "pakfood-1d336",
//   storageBucket: "pakfood-1d336.appspot.com",
//   messagingSenderId: "861871460638",
//   appId: "1:861871460638:web:79c1ed269d1201e1f9f90f",
//   measurementId: "G-7PVNDZ4DQF"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// // ✅ Only ONE onAuthStateChanged to handle both cases
// onAuthStateChanged(auth, (user) => {
//   const currentPath = location.pathname;

//   if (user) {
//     console.log("User logged in:", user.uid);

//     // If user is logged in but on login or index page, redirect to dashboard
//     if (currentPath === "/index.html" || currentPath === "/login.html") {
//       window.location.href = "admin.html";
//     }
//   } else {
//     console.log("User not logged in");

//     // If user is not logged in but trying to access admin page, redirect to login
//     if (currentPath.includes("admin.html")) {
//       window.location.href = "login.html";
//     }
//   }
// });

// // Signup handler

// // Signup handler
// function handleSignup() {
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   if (!email || !password) {
//     return Swal.fire({
//       icon: "warning",
//       title: "Missing Info",
//       text: "Please enter both email and password.",
//     });
//   }

//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       Swal.fire({
//         title: "Sign Up Successful!",
//         text: `Welcome, ${user.email}`,
//         icon: "success"
//       }).then(() => {
//         // Add a delay before redirecting to the login page
//         setTimeout(() => {
//           window.location.href = "login.html"; // Redirect to login page
//         }, 1500);  // Delay of 2 seconds (2000 milliseconds)
//       });
//     })
//     .catch((error) => {
//       console.error("Signup Error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Signup Failed",
//         text: error.message || "Invalid credentials!",
//       });
//     });
// }
// window.handleSignup = handleSignup;


// // function handleSignup() {
// //   const email = document.getElementById("email").value;
// //   const password = document.getElementById("password").value;

// //   if (!email || !password) {
// //     return Swal.fire({
// //       icon: "warning",
// //       title: "Missing Info",
// //       text: "Please enter both email and password.",
// //     });
// //   }

// //   createUserWithEmailAndPassword(auth, email, password)
// //     .then((userCredential) => {
// //       const user = userCredential.user;
// //       Swal.fire({
// //         title: "Sign Up Successful!",
// //         text: `Welcome, ${user.email}`,
// //         icon: "success"
// //       });
// //     })
// //     .catch((error) => {
// //       console.error("Signup Error:", error);
// //       Swal.fire({
// //         icon: "error",
// //         title: "Signup Failed",
// //         text: error.message || "Invalid credentials!",
// //       });
// //     });
// // }

// // Login handler
// async function handleLogin() {
//   try {
//     const email = document.getElementById("login-email").value;
//     const password = document.getElementById("login-password").value;

//     if (!email || !password) {
//       return Swal.fire({
//         icon: "warning",
//         title: "Missing Info",
//         text: "Please enter both email and password.",
//       });
//     }

//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     const result = await Swal.fire({
//       title: "Login Successful!",
//       text: `${user.email} logged in!`,
//       icon: "success",
//       confirmButtonText: "Go to Dashboard"
//     });

//     if (result.isConfirmed) {
//       window.location.href = "admin.html";
//     }

//   } catch (error) {
//     console.error("Login error:", error);
//     Swal.fire({
//       icon: "error",
//       title: "Login Failed",
//       text: error.message || "Invalid credentials or user not found.",
//     });
//   }
// }
// window.handleLogin = handleLogin;

// // Logout handler
// async function logoutUser() {
//   try {
//     await signOut(auth);

//     const result = await Swal.fire({
//       title: "Logged Out Successfully!",
//       text: "See you again soon!",
//       icon: "success",
//       confirmButtonText: "OK"
//     });

//     if (result.isConfirmed) {
//       window.location.href = "login.html";
//     }

//   } catch (error) {
//     console.error("Logout failed:", error);
//     Swal.fire({
//       icon: "error",
//       title: "Logout Failed",
//       text: error.message || "Something went wrong during logout.",
//     });
//   }
// }
// window.logoutUser = logoutUser;

// async function addProducts() {
//   const product_id = document.getElementById("productId").value;
//   const product_name = document.getElementById("productName").value;
//   const product_price = document.getElementById("productPrice").value;
//   const product_desc = document.getElementById("productDescription").value;
//   const product_url = document.getElementById("productImage").value;

//   if (!product_id || !product_name || !product_price || !product_desc || !product_url) {
//     return Swal.fire({
//       icon: "warning",
//       title: "Missing Info",
//       text: "Please fill out all product fields.",
//     });
//   }

//   try {
//     const docRef = await addDoc(collection(db, "items"), {
//       product_id,
//       product_name,
//       product_price,
//       product_desc,
//       product_url
//     });

//     Swal.fire({
//       title: "Product added successfully!",
//       text: `Document ID: ${docRef.id}`,
//       icon: "success"
//     });

//     getProductList();
//   } catch (e) {
//     console.error("Error adding product: ", e);
//     Swal.fire({
//       icon: "error",
//       title: "Failed to Add Product",
//       text: e.message || "Something went wrong!",
//     });
//   }
// }
// window.addProducts = addProducts

// let getProductListDiv = document.getElementById("product-list");

// async function getProductList() {
//   getProductListDiv.innerHTML = "";

//   const querySnapshot = await getDocs(collection(db, "items"));
//   querySnapshot.forEach((docSnap) => {
//     const data = docSnap.data();
//     getProductListDiv.innerHTML += `
//       <div class="container my-5">
//         <div class="row justify-content-center">
//           <div class="col-12 col-lg-6 two-card-col">
//             <div class="card card-custom shadow rounded-4">
//               <img src="${data.product_url}" class="card-img-top rounded-top-4" alt="Product Image">
//               <div class="card-body">
//                 <h5 class="card-title text-warning">${data.product_name}</h5>
//                 <p class="card-text">${data.product_desc}</p>
//                 <span class="badge bg-success fs-6 mb-2">Price: ${data.product_price}</span>
//                 <div class="d-flex justify-content-between mt-3">
//                   <button onclick="editItem('${docSnap.id}', ${JSON.stringify(data).replace(/"/g, '&quot;')})" class="btn btn-primary btn-sm">Edit</button>
//                   <button onclick="delItem('${docSnap.id}')" class="btn btn-danger btn-sm">Delete</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>`;
//   });
// }
// // getProductList()
// window.getProductList = getProductList();

// async function delItem(docId) {
//   try {
//     await deleteDoc(doc(db, "items", docId));
//     Swal.fire({
//       title: "Deleted!",
//       text: "The product has been removed.",
//       icon: "success"
//     });
//     getProductList();
//   } catch (error) {
//     console.error("Error deleting document:", error);
//     Swal.fire({
//       icon: "error",
//       title: "Delete Failed",
//       text: error.message || "Unable to delete the item.",
//     });
//   }
// }
// window.delItem = delItem;

// window.editItem = function (docId, data) {
//   document.getElementById("docId").value = docId;
//   document.getElementById("productId").value = data.product_id;
//   document.getElementById("productName").value = data.product_name;
//   document.getElementById("productPrice").value = data.product_price;
//   document.getElementById("productDescription").value = data.product_desc;
//   document.getElementById("productImage").value = data.product_url;

//   document.getElementById("productModalLabel").innerText = "Edit Product";

//   const modal = new bootstrap.Modal(document.getElementById("productModal"));
//   modal.show();
// };

// window.submitProduct = async function () {
//   const docId = document.getElementById("docId").value;
//   const product_id = document.getElementById("productId").value;
//   const product_name = document.getElementById("productName").value;
//   const product_price = document.getElementById("productPrice").value;
//   const product_desc = document.getElementById("productDescription").value;
//   const product_url = document.getElementById("productImage").value;

//   if (!product_id || !product_name || !product_price || !product_desc || !product_url) {
//     return Swal.fire({
//       icon: "warning",
//       title: "Missing Info",
//       text: "Please fill out all fields.",
//     });
//   }

//   try {
//     if (docId) {
//       await updateDoc(doc(db, "items", docId), {
//         product_id,
//         product_name,
//         product_price,
//         product_desc,
//         product_url
//       });
//       Swal.fire("Updated!", "Product updated successfully!", "success");
//     } else {
//       await addDoc(collection(db, "items"), {
//         product_id,
//         product_name,
//         product_price,
//         product_desc,
//         product_url
//       });
//       Swal.fire("Added!", "Product added successfully!", "success");
//     }

//     const modal = bootstrap.Modal.getInstance(document.getElementById("productModal"));
//     modal.hide();
//     document.getElementById("docId").value = "";
//     getProductList();
//   } catch (error) {
//     console.error("Submit error:", error);
//     Swal.fire({
//       icon: "error",
//       title: "Failed",
//       text: error.message || "Could not save the product.",
//     });
//   }
// };




import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAIWuHp4frQWkbDSr_7tJqLiFYdpWQcZdM",
  authDomain: "pakfood-1d336.firebaseapp.com",
  projectId: "pakfood-1d336",
  storageBucket: "pakfood-1d336.appspot.com",
  messagingSenderId: "861871460638",
  appId: "1:861871460638:web:79c1ed269d1201e1f9f90f",
  measurementId: "G-7PVNDZ4DQF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Auth state
onAuthStateChanged(auth, (user) => {
  const currentPath = location.pathname;
  if (user) {
    if (currentPath === "/index.html" || currentPath === "/login.html") {
      window.location.href = "admin.html";
       console.log("User logged in:", user.uid);
    }
  } else {
    if (currentPath.includes("admin.html")) {
      window.location.href = "login.html";
    }
  }
});

// Signup
function handleSignup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    return Swal.fire({
      icon: "warning",
      title: "Missing Info",
      text: "Please enter both email and password.",
    });
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      Swal.fire({
        title: "Sign Up Successful!",
        text: `Welcome, ${userCredential.user.email}`,
        icon: "success"
      }).then(() => {
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1500);
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.message || "Invalid credentials!",
      });
    });
}
window.handleSignup = handleSignup;

// Login
async function handleLogin() {
  try {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (!email || !password) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Info",
        text: "Please enter both email and password.",
      });
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const result = await Swal.fire({
      title: "Login Successful!",
      text: `${user.email} logged in!`,
      icon: "success",
      confirmButtonText: "Go to Dashboard"
    });

    if (result.isConfirmed) {
      window.location.href = "admin.html";
    }

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: error.message || "Invalid credentials or user not found.",
    });
  }
}
window.handleLogin = handleLogin;

// Logout
async function logoutUser() {
  const confirm = await Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out of your account!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout!",
    cancelButtonText: "Cancel"
  });

  if (confirm.isConfirmed) {
    try {
      await signOut(auth);
      Swal.fire({
        title: "Logged Out!",
        text: "You have been logged out successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1600);

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: error.message || "Something went wrong during logout.",
      });
    }
  }
}
window.logoutUser = logoutUser;
// async function logoutUser() {
//   try {
//     await signOut(auth);
//     const result = await Swal.fire({
//       title: "Logged Out Successfully!",
//       text: "See you again soon!",
//       icon: "success",
//       confirmButtonText: "OK"
//     });

//     if (result.isConfirmed) {
//       window.location.href = "login.html";
//     }

//   } catch (error) {
//     Swal.fire({
//       icon: "error",
//       title: "Logout Failed",
//       text: error.message || "Something went wrong during logout.",
//     });
//   }
// }
// window.logoutUser = logoutUser;

// Add Product
async function addProducts() {
  const product_id = document.getElementById("productId").value;
  const product_name = document.getElementById("productName").value;
  const product_price = document.getElementById("productPrice").value;
  const product_desc = document.getElementById("productDescription").value;
  const product_url = document.getElementById("productImage").value;

  if (!product_id || !product_name || !product_price || !product_desc || !product_url) {
    return Swal.fire({
      icon: "warning",
      title: "Missing Info",
      text: "Please fill out all product fields.",
    });
  }

  try {
    const docRef = await addDoc(collection(db, "items"), {
      product_id,
      product_name,
      product_price,
      product_desc,
      product_url
    });

    Swal.fire({
      title: "Product added successfully!",
      text: `Document ID: ${docRef.id}`,
      icon: "success"
    });

    getProductList();
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: "Failed to Add Product",
      text: e.message || "Something went wrong!",
    });
  }
}
window.addProducts = addProducts;

// Get Products
async function getProductList() {
  const container = document.getElementById("product-list");
  if (!container) return;
  container.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "items"));
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    container.innerHTML += `
      <div class="container my-5">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-6 two-card-col">
            <div class="card card-custom shadow rounded-4">
              <img src="${data.product_url}" class="card-img-top rounded-top-4" alt="Product Image">
              <div class="card-body">
                <h5 class="card-title text-warning">${data.product_name}</h5>
                <p class="card-text">${data.product_desc}</p>
                <span class="badge bg-success fs-6 mb-2">Price: ${data.product_price}</span>
                <div class="d-flex justify-content-between mt-3">
                  <button onclick="editItem('${docSnap.id}', ${JSON.stringify(data).replace(/"/g, '&quot;')})" class="btn btn-primary btn-sm">Edit</button>
                  <button onclick="delItem('${docSnap.id}')" class="btn btn-danger btn-sm">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  });
}
window.getProductList = getProductList;

window.addEventListener("DOMContentLoaded", () => {
  getProductList();
});

// Delete Product
async function delItem(docId) {
  try {
    await deleteDoc(doc(db, "items", docId));
    Swal.fire({
      title: "Deleted!",
      text: "The product has been removed.",
      icon: "success"
    });
    getProductList();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Delete Failed",
      text: error.message || "Unable to delete the item.",
    });
  }
}
window.delItem = delItem;

// Edit Product
window.editItem = function (docId, data) {
  document.getElementById("docId").value = docId;
  document.getElementById("productId").value = data.product_id;
  document.getElementById("productName").value = data.product_name;
  document.getElementById("productPrice").value = data.product_price;
  document.getElementById("productDescription").value = data.product_desc;
  document.getElementById("productImage").value = data.product_url;

  document.getElementById("productModalLabel").innerText = "Edit Product";

  const modal = new bootstrap.Modal(document.getElementById("productModal"));
  modal.show();
};

// Submit Product (Update or Add)
window.submitProduct = async function () {
  const docId = document.getElementById("docId").value;
  const product_id = document.getElementById("productId").value;
  const product_name = document.getElementById("productName").value;
  const product_price = document.getElementById("productPrice").value;
  const product_desc = document.getElementById("productDescription").value;
  const product_url = document.getElementById("productImage").value;

  if (!product_id || !product_name || !product_price || !product_desc || !product_url) {
    return Swal.fire({
      icon: "warning",
      title: "Missing Info",
      text: "Please fill out all fields.",
    });
  }

  try {
    if (docId) {
      await updateDoc(doc(db, "items", docId), {
        product_id,
        product_name,
        product_price,
        product_desc,
        product_url
      });
      Swal.fire("Updated!", "Product updated successfully!", "success");
    } else {
      await addDoc(collection(db, "items"), {
        product_id,
        product_name,
        product_price,
        product_desc,
        product_url
      });
      Swal.fire("Added!", "Product added successfully!", "success");
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById("productModal"));
    modal.hide();
    document.getElementById("docId").value = "";
    getProductList();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: error.message || "Could not save the product.",
    });
  }
};
