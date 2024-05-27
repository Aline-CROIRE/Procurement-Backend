const swaggerDocument =
{
  "swagger": "2.0",
  "info": {
    "title": "Procurement system",
    "version": "1.0.0",
    "description": "API Documentation"
  },
 
    
  "servers": [
    {
      "url": "http://localhost:3000",
      "description": "Local host"
    },
    {
      "url": "https://procurement-backend-red.onrender.com/",
      "description": "Deployment Server"
    }
  ],
  "schemes": [
    "http",
    "https"
  ],
  "securityDefinitions": {
    "Bearer": {
      "type": "apiKey",
      "name": "Authorization",
      "in": "header",
      "description": "Enter the token with the `Bearer ` prefix, e.g. \"Bearer abcde12345\"."
    }
  },
  "paths": {
    "/auth/signup": {
      "post": {
        "summary": "sign up as a user",
        "description": "Create a new contact and add it to the database",
        "tags": ["Authentication"],
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "description": "User details",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "description": "The first name of the user"
                },
                         
                "email": {
                  "type": "string",
                  "description": "The email address of the user"
                },
                          
                "password": {
                  "type": "string",
                  "description": "The password of the user"
                },
                "confirmPassword": {
                  "type": "string",
                  "description": "The password of the user"
                },
                           
                          
                          
              }
            }
          }
        ],
                  
        "responses": {
          "201": {
            "description": "User created"
          },
          "409": {
            "description": "A user with this email already exists."
          },
          "503": {
            "description": "There was an error processing your request. Please try again later."
          }
        }
      }
    },
        
    "/auth/login": {
      "post": {
        "summary": "User Login",
        "description": "Logs in a user with the provided credentials.",
        "tags": ["Authentication"],
        "parameters": [
          {
            "in": "body",
            "name": "userData",
            "description": "User data to log in",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "email": {
                  "type": "string",
                  "description": "The name of the user"
                },
                "password": {
                  "type": "string",
                  "description": "The password of the user"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Login successful.",
            "headers": {
              "Authorization": {
                "type": "string",
                "description": "JWT token for authentication"
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "msg": {
                      "type": "string",
                      "description": "Message indicating login success"
                    },
                    "token": {
                      "type": "string",
                      "description": "JWT token for authentication"
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized. Incorrect password or user not found."
          },
          "500": {
            "description": "Internal server error."
          }
        }
      }
   
    },
    "/forgot-password": {
      "post": {
        "summary": "Forgot Password",
        "description": "Initiates the process to reset the password for a user by sending a reset password email.",
        "tags": ["Authentication"],
        "parameters": [
          {
            "in": "body",
            "name": "forgotData",
            "description": "Forgot password data",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "email": {
                  "type": "string",
                  "description": "The email of the user"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Reset password email sent."
          },
          "404": {
            "description": "Not found. User with provided email not found."
          },
          "500": {
            "description": "Internal server error."
          }
        }
      }
    },
    "/reset-password": {
      "post": {
        "summary": "Reset Password",
        "description": "Resets the password for a user with the provided reset token and new password.",
        "tags": ["Authentication"],
        "parameters": [
          {
            "in": "query",
            "name": "token",
            "description": "The reset token received by the user",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "body",
            "name": "resetData",
            "description": "Reset password data",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "email": {
                  "type": "string",
                  "description": "The email of the user"
                },
                "newPassword": {
                  "type": "string",
                  "description": "The new password for the user"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Password reset successful."
          },
          "401": {
            "description": "Unauthorized. Invalid reset token or token has expired."
          },
          "404": {
            "description": "Not found. User with provided email not found."
          },
          "500": {
            "description": "Internal server error."
          }
        }
      }
    },
    "/user": {
      "get": {
        "summary": "Get all users",
        "description": "Get a list of all users",
        "security": [
          {
            "Bearer": []
          }
        ],
        "tags": ["Admin"],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/User"
                  }
                }
              }
            }
          },
          "500": {
            "description": "Internal server error"
          }
        }
      },
      "post": {
        "summary": "Create a new user",
        "description": "Create a new user",
        "security": [
          {
            "Bearer": []
          }
        ],
        "tags": ["Admin"],
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "description": "User details",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "description": "The first name of the user"
                },
           
                "email": {
                  "type": "string",
                  "description": "The email address of the user"
                },
            
                "password": {
                  "type": "string",
                  "description": "The password of the user"
                },
                "confirmPassword": {
                  "type": "string",
                  "description": "The password of the user"
                },
                "role": {
                  "type": "string",
                  "description": "The Role of the user"
                }
              }
            }
          }
        ],
        "responses": {
          "201": {
            "description": "User created",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/User"
                  }
                }
              }
            }
          },
          "500": {
            "description": "Internal server error"
          }
        }
      },
      
      
      "put": {
        "summary": "Update User",
        "description": "Update a user by ID",
        "security": [
          {
            "Bearer": []
          }
        ],
        "tags": ["Admin"],
        "parameters": [
          {
            "name": "id",
            "in": "query",
            "description": "ID of the user to update",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "body",
            "in": "body",
            "description": "New user data",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "description": "New name of the user"
                },
                "email": {
                  "type": "string",
                  "description": "New email of the user"
                },
                "password": {
                  "type": "string",
                  "description": "New password of the user"
                },
                "role": {
                  "type": "string",
                  "enum": ["admin", "HOD", "Manager", "supplier"],
                  "description": "New role of the user"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "User updated successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/User"
                  }
                }
              }
            }
          },
          "404": {
            "description": "User not found"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      },
      "delete": {
        "summary": "Delete User",
        "description": "Delete a user by ID",
        "security": [
          {
            "Bearer": []
          }
        ],
        "tags": ["Admin"],
        "parameters": [
          {
            "name": "id",
            "in": "query",
            "description": "ID of the user to delete",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "User deleted successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/User"
                  }
                }
              }
            }
          },
          "404": {
            "description": "User not found"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      },
      
    },
    "/create": {
      "post": {
        "summary": "Create a new request",
        "description": "Create a new procurement request",
        "tags": ["Request"],
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "description": "Request details",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Request",
              type: "object",
              "properties": {
                "title": {
                  "type": "string",
                  "description": "The title of the what you request"
                },
           
                "description": {
                  "type": "string",
                  "description": "The descrption "
                },
            
                "status": {
                  "type": "string",
                  "description": "The status of purchase requistion"
                },
                "Quantity": {
                  "type": "string",
                  "description": "The Quantity of what you are requesting "
                },
                
              }
            }
          }
        ],
        
        "responses": {
          "201": {
            "description": "Request created"
          },
          "400": {
            "description": "Invalid input"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/allRequest": {
      "get": {
        "summary": "Get all requests",
        "description": "Retrieve a list of all procurement requests",
        "tags": ["Request"],
        "responses": {
          "200": {
            "description": "Successful operation",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Request"
              }
            }
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/request/{id}": {
      "get": {
        "summary": "Get request by ID",
        "description": "Retrieve a specific request by ID",
        "tags": ["Request"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of the request to retrieve",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "schema": {
              "$ref": "#/definitions/Request"
            }
          },
          "404": {
            "description": "Request not found"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/{id}/status": {
      "post": {
        "summary": "Update request status",
        "description": "Update the status of a specific request",
        "tags": ["Request"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of the request to update",
            "required": true,
            "type": "string"
          },
          {
            "name": "body",
            "in": "body",
            "description": "New status of the request",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "status": {
                  "type": "string",
                  "enum": ["Pending", "Approved", "Rejected"],
                  "description": "The new status of the request"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Request status updated successfully"
          },
          "400": {
            "description": "Invalid status"
          },
          "404": {
            "description": "Request not found"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/request/{id}": {
      "post": {
        "summary": "Update request",
        "description": "Update details of a specific request",
        "tags": ["Request"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of the request to update",
            "required": true,
            "type": "string"
          },
          {
            "name": "body",
            "in": "body",
            "description": "Updated request details",
            "required": true,
            "schema": {
              type: "object",
              "properties": {
                "title": {
                  "type": "string",
                  "description": "The title of the what you request"
                },
           
                "description": {
                  "type": "string",
                  "description": "The descrption "
                },
            
                "status": {
                  "type": "string",
                  "description": "The status of purchase requistion"
                },
                "Quantity": {
                  "type": "string",
                  "description": "The Quantity of what you are requesting "
                },
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Request updated successfully"
          },
          "400": {
            "description": "Invalid input"
          },
          "404": {
            "description": "Request not found"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      },
      "delete": {
        "summary": "Delete request",
        "description": "Delete a specific request",
        "tags": ["Request"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of the request to delete",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "Request deleted successfully"
          },
          "404": {
            "description": "Request not found"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },

  
      "/tenders": {
        "get": {
          "summary": "Retrieve all tenders",
          "description": "Returns a list of all tenders.",
          "tags": ["Tender"],
          "responses": {
            "200": {
              "description": "A list of tenders."
            },
            "404": {
              "description": "No tenders found."
            }
          }
        }
    },
      
      "/tender": {
        "post": {
          "summary": "Submit a new tender",
          "description": "Creates a new tender with the provided details.",
          "tags": ["Tender"],
          "parameters": [
            {
              "in": "body",
              "name": "applicationForm",
              "description": "Application form details",
              "required": true,
              
                "properties": {
                  "title": {
                    "type": "string"
                  },
                  "Qualification": {
                    "type": "string"
                  },
                  "location": {
                    "type": "string"
                  },
                  "image": {
                    "type": "string"
                  },
                  "deadline": {
                    "type": "string"
                  }
                
                }
              }
            
          ],
          "responses": {
            "201": {
              "description": "Tender form submitted successfully."
            },
            "500": {
              "description": "Internal server error."
            }
          }
        }
      },
      "/select-tender": {
        "post": {
          "summary": "Select a tender",
          "description": "Updates the status of a tender to 'Approved'.",
          "tags": ["Tender"],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "The ID of the tender to update."
            }
          ],
          "responses": {
            "200": {
              "description": "Tender selected successfully."
            },
            "404": {
              "description": "Tender not found."
            },
            "500": {
              "description": "Internal server error."
            }
          }
        }
      },
      "/reject-tender": {
        "post": {
          "summary": "Reject a tender",
          "description": "Updates the status of a tender to 'Rejected'.",
          "tags": ["Tender"],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "The ID of the tender to update."
            }
          ],
          "responses": {
            "200": {
              "description": "Tender status updated to rejected."
            },
            "404": {
              "description": "Tender not found."
            },
            "500": {
              "description": "Internal server error."
            }
          }
        }
    },
    
      "/candidate": {
        "get": {
          "summary": "Retrieve all applicants",
          "description": "Returns a list of all applicants.",
          "tags": ["Application-form"],
          "responses": {
            "200": {
              "description": "A list of applicants."
            },
            "404": {
              "description": "No applicants found."
            }
          }
        }
      },
      "/form": {
        "post": {
          "summary": "Submit a new application form",
          "description": "Creates a new application form with the provided details.",
          "tags": ["Application-form"],
          "parameters": [
            {
              "in": "body",
              "name": "applicationForm",
              "description": "Application form details",
              "required": true,
              
                
                "properties": {
                  "fullName": {
                    "type": "string"
                  },
                  "email": {
                    "type": "string"
                  },
                  "companyName": {
                    "type": "string"
                  },
                  "companyAddress": {
                    "type": "string"
                  },
                  "contactNumber": {
                    "type": "string"
                  },
                  "cv": {
                    "type": "string",
                    "format": "binary"
                  },
                  "whyHire": {
                    "type": "string"
                  }
                }
              }
            
          ],

          "responses": {
            "201": {
              "description": "Application form submitted successfully."
            },
            "500": {
              "description": "Internal server error."
            }
          }
        }
      },
      "/select-application": {
        "patch": {
          "summary": "Select an application",
          "description": "Updates the status of an application to \"selected\".",
          "tags": ["Application-form"],
          "parameters": [
            {
              "name": "id",
              "in": "query",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "The ID of the application to update."
            }
          ],
          "responses": {
            "200": {
              "description": "Application selected successfully."
            },
            "404": {
              "description": "Application not found."
            },
            "500": {
              "description": "Internal server error."
            }
          }
        }
      },
      "/reject-application": {
        "post": {
          "summary": "Delete rejected applications",
          "description": "Updates the status of an application to \"rejected\" and deletes all applications with this status.",
          "tags": ["Application-form"],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "The ID of the application to update."
            }
          ],
          "responses": {
            "200": {
              "description": "Rejected applications deleted successfully."
            },
            "404": {
              "description": "Application not found."
            },
            "500": {
              "description": "Internal server error."
            }
          }
        }
      }
},
  

    "components": {
      "schemas": {
        "User": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "User's name"
            },
            "email": {
              "type": "string",
              "description": "User's email"
            },
            "password": {
              "type": "string",
              "description": "User's password"
      
            },
            "role": {
              "type": "string",
              "description": "User's role"
            },
            "required": ["name", "email", "role"]
          }
        },
        "LoginRequest": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "User's name"
            },
            "password": {
              "type": "string",
              "description": "User's password"
            }
          },
          "required": ["name", "password"]
        },
        "LoginResponse": {
          "type": "object",
          "properties": {
            "msg": {
              "type": "string",
              "description": "Message indicating successful login"
            },
            "token": {
              "type": "string",
              "description": "JWT token for authentication"
            }
          },
          "required": ["msg", "token"]
        },
        "ForgotPasswordRequest": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": "User's email address"
            }
          },
          "required": ["email"]
        },
        "ResetPasswordRequest": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": "User's email address"
            },
            "resetToken": {
              "type": "string",
              "description": "Reset token received by the user"
            },
            "newPassword": {
              "type": "string",
              "description": "New password to set"
            }
          },
          "required": ["email", "resetToken", "newPassword"]
        }
      },
      "Request": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "description": "Title of the request"
          },
          "description": {
            "type": "string",
            "description": "Description of the request"
          },
          "status": {
            "type": "string",
            "enum": ["Pending", "Approved", "Rejected"],
            "default": "Pending",
            "description": "Status of the request"
          },
          "Quantity": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "List of quantities required"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time",
            "description": "Creation date of the request"
          }
        },
        "required": ["title", "description", "Quantity"]
      }
      
    }

  }

module.exports= swaggerDocument