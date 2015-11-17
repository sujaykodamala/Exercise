using KnockoutMVC.EntityDataModel;
using KnockoutMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KnockoutMVC.Controllers
{
    /// <summary>
    /// Student Api controller
    /// </summary>
    public class CustomerController : ApiController
    {
        // GET api/student
        public IEnumerable<Customer> Get()
        {
            return CustomerRepository.GetCustomers();
        }

        // GET api/student/5
        public Customer Get(int id)
        {
            return CustomerRepository.GetCustomers().FirstOrDefault(s=>s.ID == id);
        }

        // POST api/student
        public HttpResponseMessage Post(Customer customer)
        {
            CustomerRepository.InsertCustomer(customer);
            var response = Request.CreateResponse(HttpStatusCode.Created, customer);
            string url = Url.Link("DefaultApi", new {customer.ID});
            response.Headers.Location = new Uri(url);

            return response;
        }

        // DELETE api/student/5
        public HttpResponseMessage Delete(int id)
        {
            CustomerRepository.DeleteCustomer(id);
            var response = Request.CreateResponse(HttpStatusCode.OK, id);
            return response;
        }
    }
}
