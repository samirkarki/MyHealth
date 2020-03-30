// Form.js

import React, { useState, Fragment, useEffect } from 'react';
import InfectedCountryInput from '../../../components/form-inputs/InfectedCountryInput';
import { useSelector, useDispatch } from 'react-redux';
import { addCountry, load, remove, updateItem } from '../../../store/actions/countryAction';
import { getCurrentPaginatedItems } from '../../../utils/table-helper';
import EditCountryForm from './country-edit-form';
import CountryTable from './country-crud-table';
import ClientPagination from '../../../components/pagination/client-side-pagination';

const InfectedCountryForm = () => {


    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [editing, setEditing] = useState(false);
    const [currentEditItem, setCurrentEditItem] = useState();

    const tableData = useSelector(state => state.countryReducer);

    useEffect(() => {
        dispatch(load())
    }, [])

    // add form logic start
    const blankCountry = { name: '' };
    const [infectedCountryState, setInfectedCountryState] = useState([
        { ...blankCountry },
    ]);

    const addInfectedCountry = () => {
        setInfectedCountryState([...infectedCountryState, { ...blankCountry }]);
    };

    const handleInfectedCountryChange = (e) => {
        const updatedCountry = [...infectedCountryState];
        updatedCountry[e.target.dataset.idx][e.target.className.split(" ")[0]] = e.target.value;
        setInfectedCountryState(updatedCountry);
    };

    const clearForm = () => {
        setInfectedCountryState([
            { ...blankCountry }
        ]);
    }
    // add form logic ends here


    // CRUD 
    // INSERT
    const submitForm = (e) => {
        e.preventDefault();
        let arr = JSON.stringify(infectedCountryState);
        dispatch(addCountry(arr));
        clearForm();
    }

    // DELETE
    const deleteSymptom = (id) => {
        setEditing(false);
        if(window.confirm('Are you sure to delete ?') == true){
            dispatch(remove(id));
        }
    }

    const update = (item) => {
        setEditing(false);
        dispatch(updateItem(item));
    }

    const editRow = (item) => {
        setEditing(true);
        setCurrentEditItem(item);
    }
    // end CRUD


    // pagination
    let currentDataItems = []
    if (tableData.countryInfo) {
        currentDataItems = getCurrentPaginatedItems(currentPage, itemsPerPage, tableData.countryInfo);
    }

    const callback = (data) => {
        setCurrentPage(data);
    }
    // end pagination



    return (
        <div className="row">
            <div className="col-md-4">
                {editing ? (
                    <Fragment>
                        <h3>Edit Country</h3>
                        <div className="clearfix"></div>

                        <EditCountryForm
                            editing={editing}
                            setEditing={setEditing}
                            currentCountries={currentEditItem}
                            update={update}
                        />
                    </Fragment>
                ) : (
                        <form onSubmit={submitForm} style={{ marginTop: '5px' }}>
                            <h3>Add Country</h3>

                            <input
                                type="button"
                                className="btn btn-primary btn-sm float-right"
                                value="Add New Country"
                                onClick={addInfectedCountry}
                            />

                            <div className="clearfix"></div>

                            <Fragment>
                                {infectedCountryState.map((val, idx) => (
                                    <InfectedCountryInput
                                        key={`country-${idx}`}
                                        idx={idx}
                                        infectedCountryState={infectedCountryState}
                                        handleInfectedCountryChange={handleInfectedCountryChange}
                                        required={true}
                                    />
                                ))}
                            </Fragment>
                            <input type="submit" value="Submit" className="btn btn-primary" />
                        </form>
                    )}
            </div>
            <div className="col-md-8">
                <ClientPagination
                    data={tableData.countryInfo != null ? tableData.countryInfo : []}
                    itemsPerPage={itemsPerPage}
                    activeClassName=''
                    parentCallback={callback}
                >
                    <CountryTable data={currentDataItems} editRow={editRow} delete={deleteSymptom} />
                </ClientPagination>
            </div>

        </div>








        // <form onSubmit={submitCountryForm} style={{marginTop: '5px'}}>
        //     <input
        //         type="button"
        //         className="btn btn-primary btn-sm float-right"
        //         value="Add New Country"
        //         onClick={addInfectedCountry}
        //     />
        //     <div className="clearfix"></div>
        //     {
        //         infectedCountryState.map((val, idx) => (
        //             <InfectedCountryInput
        //                 key={`country-${idx}`}
        //                 idx={idx}
        //                 infectedCountryState={infectedCountryState}
        //                 handleInfectedCountryChange={handleInfectedCountryChange}
        //             />
        //         ))
        //     }
        //     <input type="submit" value="Submit" className="btn btn-primary"/>
        // </form>
    );
};

export default InfectedCountryForm;