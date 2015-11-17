using KnockoutMVC.EntityDataModel;
using System.Collections.Generic;
using System.Linq;

namespace KnockoutMVC.Models
{
    /// <summary>
    /// Student data repository
    /// </summary>
    public class CustomerRepository
    {
        private static CustomerEntities _customerDb;

        private static CustomerEntities CustomerDb
        {
            get { return _customerDb ?? (_customerDb = new CustomerEntities()); }
        }

        /// <summary>
        /// Gets the students.
        /// </summary>
        /// <returns>IEnumerable Student List</returns>
        public static IEnumerable<Customer> GetCustomers()
        {
            var query = from customers in CustomerDb.Customers select customers;
            return query.ToList();
        }

        /// <summary>
        /// Inserts the student to database.
        /// </summary>
        /// <param name="student">The student object to insert.</param>
        public static void InsertCustomer(Customer customer)
        {
            CustomerDb.Customers.Add(customer);
            CustomerDb.SaveChanges();
        }

        /// <summary>
        /// Deletes student from database.
        /// </summary>
        /// <param name="studentId">Student ID</param>
        public static void DeleteCustomer(int customerId)
        {
            var deleteItem = CustomerDb.Customers.FirstOrDefault(c => c.ID == customerId);

            if (deleteItem != null)
            {
                CustomerDb.Customers.Remove(deleteItem);
                CustomerDb.SaveChanges();
            }
        }
    }
}