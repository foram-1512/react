import React, { useState, useEffect, useRef } from 'react';
import { getBookListing, getDeleteBook, getUpdateBook, getBookDetail } from '../../services/HomeService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';
import AdminSidebar from './AdminSidebar';


function BookListing() {
  const route = useNavigate();
  const [books, setBooks] = useState([]);

  const [Editbook, SetEditbook] = useState(null);
  const demoModeRef = useRef();

  useEffect(() => {
    getBookListing()
      .then(response => {
        setBooks(response?.data);
      })
      .catch(error => {
        console.error("Error Book listing:", error);
      });
  }, []);

 
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        getDeleteBook({ user_id: id })
          .then(r => {
            const afterDeleteListing = books.filter((r) => {
              if (r?.id !== id) {
                return r;
              }
            });
            setBooks(afterDeleteListing);
          })
          .catch(error => {
            console.error("Error deleting employee:", error);
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };

  // // const handleEdit = (id) => {
  // //   getBookDetail({ book_id: id })
  // //     .then(response => {
  // //       console.log("editid",id);
  // //       SetEditbook(response.data[0]);
  // //     })
  // //     .catch(error => {
  // //       console.error("Error in book listing:", error);
  // //     });
  // //   demoModeRef.current.classList.add('fade');
  // //   demoModeRef.current.classList.add('show');
  // //   demoModeRef.current.style.display = 'block';

  // // };
  //  const bookForm = data => {


  //       var formData = new FormData();
  //       formData.append('name', data.name);
  //       formData.append('thumbnail', data.thumbnail[0]);
  //       formData.append('title', data.title);
  //       formData.append('author', data.author);
  //       formData.append('book_pdf', data.pdf[0]);
  //       formData.append('pages', data.pages);
  //       formData.append('price', data.price);
  //       formData.append('tags', data.tags);
  //       formData.append('user_id', user_id);

  //       addBook(formData).then((r) => {

  //           if (r.code == 1) {
  //               toast.success(r?.message);
  //               setTimeout(() => {
  //                   router('/Dashboard');
  //               }, 1500);
  //           } else {
  //               setMes(r?.message)
  //               setError('true')
  //               toast.error(r?.message);
  //           }
  //       });
  //   };
  
  const saveChange = (id, data) => {
    const bookForm = data => {
      var formData = new FormData();
      formData.append('name', data.name);
      formData.append('thumbnail', data.thumbnail[0]);
      formData.append('title', data.title);
      formData.append('author', data.author);
      formData.append('book_pdf', data.pdf[0]);
      formData.append('pages', data.pages);
      formData.append('price', data.price);
      formData.append('tags', data.tags);
      formData.append('user_id', id);
  
      return formData;
    };
  
    const formData = bookForm(data);
  
    getUpdateBook(id, formData)
      .then(updatedBook => {
        console.log("Updated book:", updatedBook);
        const editBooks = books?.map(b => b.id === updatedBook?.id ? updatedBook : b);
        setBooks(editBooks);
        toast.success("Book updated successfully");
      })
      .catch(error => {
        console.error("Error updating book", error);
        toast.error("Error updating book");
      });
  };
  
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    SetEditbook({ ...Editbook, [fieldName]: [file] });
  };
  const handleEdit = (id) => {
    getBookDetail({ book_id: id })
      .then(response => {
        console.log("editid", id);
        SetEditbook(response.data[0]);
      })
      .catch(error => {
        console.error("Error in book listing:", error);
      });
    // Show the modal
    const modal = document.getElementById('demoModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  };

  const editModel = (id) => {
    demoModeRef.current.classList.add('fade');
    demoModeRef.current.classList.add('show');
    demoModeRef.current.style.display = 'none';

  };

  // const saveChange = (id) => {
  //   const bookForm = data => {


  //     var formData = new FormData();
  //     formData.append('name', data.name);
  //     formData.append('thumbnail', data.thumbnail[0]);
  //     formData.append('title', data.title);
  //     formData.append('author', data.author);
  //     formData.append('book_pdf', data.pdf[0]);
  //     formData.append('pages', data.pages);
  //     formData.append('price', data.price);
  //     formData.append('tags', data.tags);
  //     formData.append('user_id', user_id);
      
  //   getUpdateBook(Editbook)

  //     .then(getUpdateBook => {
  //       console.log("ghjkdfghj", Editbook);
  //       const editBooks = books?.map(b => {
  //         return b.id === Editbook?.id ? Editbook : b;
  //       });
  //       setBooks(editBooks);

  //       toast.success("Book updated successfully");
  //     })
  //     .catch(error => {
  //       console.error("fcvgbhmjmk", error);
  //       toast.error("Error updating book");
  //     });

  // };


  // const handleFileChange = (e, fieldName) => {
  //   const file = e.target.files[0].name;
  //   // Update the state with the selected file
  //   SetEditbook({ ...Editbook, [fieldName]: file });
  // };

  // return (
  //   <>
  //     <div className="row">
  //       <div className="col-2">
  //         <AdminSidebar />

  //       </div>
  //       <div className="col-10">
  //         <body id="body-pd">
  //           <div className="main content-wraper">
  //             <h1 className='d-flex justify-content-center mt-3'>Order Details</h1>
  //             {/* <div className="content-wrapper">
  //         <h1 className='d-flex justify-content-center'>Book List</h1> */}
  //             {/* <table className="table table-striped me-5 mt-3  table-hover table-border " > */}
  //             <div className="table-responsive mt-5 d-flex justify-content-start me-5">
  //               <table className="table table-striped me-5 " >
  //                 <thead>
  //                   <tr>
  //                     <th scope="col" className="th">Id</th>
  //                     <th scope="col" className="th">Thumbnail</th>
  //                     <th scope="col" className="th">Book Name</th>
  //                     <th scope="col" className="th">Author Name</th>
  //                     <th scope="col" className="th">Title</th>
  //                     <th scope="col" className="th">Tag</th>
  //                     <th scope="col" className="th">Price</th>
  //                     <th scope="col" className="th">Pages</th>
  //                     <th scope="col" className="th">PDF</th>
  //                     <th scope="col" className="th">Action</th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>
  //                   {books?.length > 0 ? (
  //                     books?.map((b, index) => (
  //                       <tr key={index}>

  //                         <td className="th">{b?.id}</td>
  //                         <td className="th"><img src={b?.thumbnail} style={{ height: '100px', width: '100px' }} /></td>
  //                         <td className="th">{b?.name}</td>
  //                         <td className="th">{b?.author}</td>
  //                         <td className="th">{b?.title}</td>
  //                         <td className="th">{b?.tags}</td>
  //                         <td className="th">{b?.price}</td>
  //                         <td className="th">{b?.pages}</td>
  //                         <td className="th"><Link to={b?.pdf} target='_blank'><button className="btn btn-info me-3">View PDF</button></Link></td>
  //                         <td className="th">
  //                           <MdDeleteForever style={{ fontSize: '2em', color: "red" }} onClick={() => handleDelete(b?.id)} className=' me-3' />
  //                           <FaUserEdit style={{ fontSize: '2em', color: "blue" }} onClick={() => handleEdit(b?.id)} data-bs-toggle="modal" data-bs-target={`#demoModal`} className='me-3' />
  //                         </td>
  //                       </tr>
  //                     ))
  //                   ) : (
  //                     <tr>
  //                       <td colSpan="6" className="text-center">No Books Found</td>
  //                     </tr>
  //                   )}
  //                 </tbody>
  //               </table>
  //             </div>

  //           </div>
  //           </body>
  //       </div>
  //     </div>

  //     {/* <AdminSidebar /> */}

  //     {/* edit model */}
  //     <div className="modal fade" ref={demoModeRef} id={`demoModal`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  //       <div className="modal-dialog">
  //         <div className="modal-content">
  //           <div className="modal-header">
  //             <h5 className="modal-title" id="exampleModalLabel">Edit Profile</h5>
  //             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  //           </div>
  //           <div className="modal-body border-2" >
  //             <form >

  //               <div className="mb-3">
  //                 <label htmlFor="name" className="form-label">Book Name</label>
  //                 <input type="text" className="form-control" id="name" value={Editbook?.name} onChange={(e) => SetEditbook({ ...Editbook, name: e?.target.value })} />
  //               </div>
  //               <div className="mb-3">
  //                 <label htmlFor="author" className="form-label">Author Name</label>
  //                 <input type="text" className="form-control" id="author" value={Editbook?.author} onChange={(e) => SetEditbook({ ...Editbook, author: e?.target.value })} />
  //               </div>
  //               <div className="mb-3">
  //                 <label htmlFor="title" className="form-label">Book Title</label>
  //                 <input type="title" className="form-control" id="title" value={Editbook?.title} onChange={(e) => SetEditbook({ ...Editbook, title: e.target.value })} />
  //               </div>
  //               {/* <div className="mb-3">
  //                         <label htmlFor="thumbnail" className="form-label">Image</label>
  //                         <input type="file" className="form-control" id="thumbnail" value={Editbook?.thumbnail} onChange={(e) => SetEditbook({ ...Editbook, thumbnail: e.target.value })} />
  //                       </div> */}
  //               <div className="mb-3">
  //                 <label htmlFor="thumbnail" className="form-label">Image</label>
  //                 <input type="file" className="form-control" id="thumbnail" onChange={(e) => handleFileChange(e, 'thumbnail')} />
  //               </div>
  //               <div className="mb-3">
  //                 <label htmlFor="pages" className="form-label">No of Pages</label>
  //                 <input type="number" className="form-control" id="title" value={Editbook?.pages} onChange={(e) => SetEditbook({ ...Editbook, pages: e.target.value })} />
  //               </div>
  //               <div className="mb-3">
  //                 <label htmlFor="tags" className="form-label">Book Tags</label>
  //                 <input type="text" className="form-control" id="tags" value={Editbook?.tags} onChange={(e) => SetEditbook({ ...Editbook, tags: e.target.value })} />
  //               </div>
  //               <div className="mb-3">
  //                 <label htmlFor="price" className="form-label">Book Price</label>
  //                 <input type="text" className="form-control" id="price" value={Editbook?.price} onChange={(e) => SetEditbook({ ...Editbook, tags: e.target.value })} />
  //               </div>
  //               {/* <div className="mb-3">
  //                 <label htmlFor="pdf" className="form-label">PDF</label>
  //                 <input type="file" className="form-control" id="pdf" value={Editbook?.pdf} onChange={(e) => SetEditbook({ ...Editbook, thumbnail: e.target.value })} />
  //               </div> */}
  //               <div className="mb-3">
  //                 <label htmlFor="pdf" className="form-label">PDF</label>
  //                 <input type="file" className="form-control" id="pdf" onChange={(e) => handleFileChange(e, 'pdf')} />
  //               </div>

  //             </form>
  //           </div>
  //           <div class="modal-footer">
  //             <button type="submit" onClick={() => editModel()} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  //             <button type="button" onClick={() => saveChange()} class="btn btn-primary" data-bs-dismiss="modal" >Save changes</button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>





  //   </>
  // );

  return (
    <>
      <div className="row">
        <div className="col-2">
          <AdminSidebar />
        </div>
        <div className="col-10">
          <div className="main content-wraper">
            <h1 className='d-flex justify-content-center mt-3'>Order Details</h1>
            <div className="table-responsive mt-5 d-flex justify-content-start me-5">
              <table className="table table-striped me-5 ">
                <thead>
                  <tr>
                    <th scope="col" className="th">Id</th>
                    <th scope="col" className="th">Thumbnail</th>
                    <th scope="col" className="th">Book Name</th>
                    <th scope="col" className="th">Author Name</th>
                    <th scope="col" className="th">Title</th>
                    <th scope="col" className="th">Tag</th>
                    <th scope="col" className="th">Price</th>
                    <th scope="col" className="th">Pages</th>
                    <th scope="col" className="th">PDF</th>
                    <th scope="col" className="th">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {books?.length > 0 ? (
                    books?.map((b, index) => (
                      <tr key={index}>
                        <td className="th">{b?.id}</td>
                        <td className="th"><img src={b?.thumbnail} style={{ height: '100px', width: '100px' }} /></td>
                        <td className="th">{b?.name}</td>
                        <td className="th">{b?.author}</td>
                        <td className="th">{b?.title}</td>
                        <td className="th">{b?.tags}</td>
                        <td className="th">{b?.price}</td>
                        <td className="th">{b?.pages}</td>
                        <td className="th"><Link to={b?.pdf} target='_blank'><button className="btn btn-info me-3">View PDF</button></Link></td>
                        <td className="th">
                          <MdDeleteForever style={{ fontSize: '2em', color: "red" }} onClick={() => handleDelete(b?.id)} className=' me-3' />
                          <FaUserEdit style={{ fontSize: '2em', color: "blue" }} onClick={() => handleEdit(b?.id)} data-bs-toggle="modal" data-bs-target={`#demoModal`} className='me-3' />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center">No Books Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  
      {/* Edit Modal */}
      
      <div className="modal fade" ref={demoModeRef} id={`demoModal`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Book</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body border-2">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Book Name</label>
                  <input type="text" className="form-control" id="name" value={Editbook?.name || ''} onChange={(e) => SetEditbook({ ...Editbook, name: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label htmlFor="author" className="form-label">Author Name</label>
                  <input type="text" className="form-control" id="author" value={Editbook?.author || ''} onChange={(e) => SetEditbook({ ...Editbook, author: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Book Title</label>
                  <input type="title" className="form-control" id="title" value={Editbook?.title || ''} onChange={(e) => SetEditbook({ ...Editbook, title: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label htmlFor="thumbnail" className="form-label">Image</label>
                  <input type="file" className="form-control" id="thumbnail" onChange={(e) => handleFileChange(e, 'thumbnail')} />
                </div>
                <div className="mb-3">
                  <label htmlFor="pages" className="form-label">No of Pages</label>
                  <input type="number" className="form-control" id="pages" value={Editbook?.pages || ''} onChange={(e) => SetEditbook({ ...Editbook, pages: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tags" className="form-label">Book Tags</label>
                  <input type="text" className="form-control" id="tags" value={Editbook?.tags || ''} onChange={(e) => SetEditbook({ ...Editbook, tags: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Book Price</label>
                  <input type="text" className="form-control" id="price" value={Editbook?.price || ''} onChange={(e) => SetEditbook({ ...Editbook, price: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label htmlFor="pdf" className="form-label">PDF</label>
                  <input type="file" className="form-control" id="pdf" onChange={(e) => handleFileChange(e, 'pdf')} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={() => editModel()} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={() => saveChange(Editbook?.id, Editbook)} className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



export default BookListing;
