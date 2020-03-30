// Form.js

import React, { useState, useEffect, Fragment } from 'react';
import SymptomsInput from '../../../components/form-inputs/SymptomsInput';
import { useDispatch, useSelector } from 'react-redux';
import { load, remove, updateItem, addSymptoms } from '../../../store/actions/symptomsAction';
import EditSymptomForm from './symptom-edit-form';
import ClientPagination from '../../../components/pagination/client-side-pagination';
import { getCurrentPaginatedItems } from '../../../utils/table-helper';
import SymptomsTable from './symptoms-crud-table';


const SymptomsForm = () => {

    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [editing, setEditing] = useState(false);
    const [currentEditItem, setCurrentEditItem] = useState();

    const tableData = useSelector(state => state.symptomsReducer);

    useEffect(() => {
        dispatch(load())
    }, [])


    // add form logic start
    const blankSymptom = { name: '' };
    const [symptomState, setSymptomState] = useState([
        { ...blankSymptom },
    ]);

    const addSymptom = () => {
        setSymptomState([...symptomState, { ...blankSymptom }]);
    };

    const handleSymptomChange = (e) => {
        const updatedSymptom = [...symptomState];
        updatedSymptom[e.target.dataset.idx][e.target.className.split(" ")[0]] = e.target.value;
        setSymptomState(updatedSymptom);
    };

    const clearForm = () => {
        setSymptomState([
            { ...blankSymptom }
        ]);
    }
    // add form logic ends here

    // CRUD 
    // INSERT
    const submitForm = (e) => {
        e.preventDefault();
        let arr = JSON.stringify(symptomState);
        dispatch(addSymptoms(arr));
        clearForm();
    }

    // DELETE
    const deleteSymptom = (id) => {
        setEditing(false);
        if (window.confirm('Are you sure to delete ?')) {
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
    if (tableData.symptomsInfo) {
        currentDataItems = getCurrentPaginatedItems(currentPage, itemsPerPage, tableData.symptomsInfo);
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
                        <h3>Edit Symptom</h3>
                        <div className="clearfix"></div>

                        <EditSymptomForm
                            editing={editing}
                            setEditing={setEditing}
                            currentSymptoms={currentEditItem}
                            update={update}
                        />
                    </Fragment>
                ) : (
                        <form onSubmit={submitForm} style={{ marginTop: '5px' }}>
                            <h3>Add Symptom</h3>

                            <input
                                type="button"
                                className="btn btn-primary btn-sm float-right"
                                value="Add New Symptom"
                                onClick={addSymptom}
                            />

                            <div className="clearfix"></div>

                            <Fragment>
                                {symptomState.map((val, idx) => (
                                     <SymptomsInput
                                        key={`symptom-${idx}`}
                                        idx={idx}
                                        symptomsState={symptomState}
                                        handleSymptomsChange={handleSymptomChange}
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
                    data={tableData.symptomsInfo != null ? tableData.symptomsInfo: []}
                    itemsPerPage={itemsPerPage}
                    activeClassName=''
                    parentCallback={callback}
                >
                    <SymptomsTable data={currentDataItems} editRow={editRow} delete={deleteSymptom} />
                </ClientPagination>
            </div>

        </div>
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // <form onSubmit={submitForm} style={{ marginTop: '5px' }}>
        //     <input
        //         type="button"
        //         className="btn btn-primary btn-sm float-right"
        //         value="Add New Symptom"
        //         onClick={addSymptom}
        //     />
        //     <div className="clearfix"></div>
        //     {
        //         symptomState.map((val, idx) => (
        //             <SymptomsInput
        //                 key={`symptom-${idx}`}
        //                 idx={idx}
        //                 symptomsState={symptomState}
        //                 handleSymptomsChange={handleSymptomChange}
        //             />
        //         ))
        //     }
        //     <input type="submit" value="Submit" className="btn btn-primary" />
        // </form>
    );
};

export default SymptomsForm;