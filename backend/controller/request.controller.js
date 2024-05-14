// requestcontroller.js
const Request = require('../model/request.model');

// Create a new purchase requisition
async function createRequest(req, res) {
    
  try {
    const { title, description, Quantity } = req.body;
    const request = await Request.create({
      title,
      description,
      Quantity
    });

    res.status(201).json(request);
  } catch (error) {

    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get all purchase requisitions
async function getAllRequests(req, res) {
  try {
    const requests = await Request.find()
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get a purchase requisition by ID
async function getRequestById(req, res) {
  try {
    const requestId = req.params.id;
    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ error: 'Purchase Requisition not found' });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update the status of a purchase requisition
async function updateRequestStatus(req, res) {
  try {
    const requestId = req.params.id;
    const { status } = req.body;

    const request = await Request.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ error: 'Purchase Requisition not found' });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update a purchase requisition
async function updateRequest(req, res) {
    try {
      const requestId = req.body
      const { title, description, Quantity } = req.body;
  
      
      // Update the purchase requisition
      const request = await Request.findByIdAndUpdate(
        requestId,
        {
          title,
          description,
         Quantity
        },
        { new: true }
      )
  
      if (!request) {
        return res.status(404).json({ error: 'Purchase Requisition not found' });
      }
  
      res.json(request);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  // Delete a purchase requisition
  async function deleteRequest(req, res) {
    try {
      const requestId = req.body
  
      const request = await Request.findByIdAndDelete(requestId);
  
      if (!request) {
        return res.status(404).json({ error: 'Purchase Requisition not found' });
      }
  
      res.json({ message: 'Purchase Requisition deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequestStatus,
  updateRequest,
  deleteRequest
};