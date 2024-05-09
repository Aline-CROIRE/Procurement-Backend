const swaggerDocument = 
{
    "swagger": "2.0",
    "info": {
      "title": "Procurement system",
      "version": "1.0.0",
      "description": "API Documentation"
    },
    "host": "localhost:8080",
    "basePath": "/",
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
            "post":{
                "summary": "sign up as a user",
                "description": "Create a new contact and add it to the database",
                "tags": ["Contacts"],
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
                                "description": "The role of the user"
                            }
                          
                          
                        }
                      }
                    }
                  ],
                  
                  "responses":{
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
        }
    },
    "components": {
        "schemas": {
            "User": {
                "type": "object",
                "properties": {
                    "name":{
                        "type": "string",
                        "description": "User's name"
                      },
                      "email": {
                        "type": "string",
                        "description": "User's email"
                    },
                    "password":{
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
        }
    }
}
module.exports= swaggerDocument