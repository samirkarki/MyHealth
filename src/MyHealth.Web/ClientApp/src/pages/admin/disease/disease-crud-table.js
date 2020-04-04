import React from "react";
import "./index.css";

const DiseaseTable = ({ checkedItems, selectDiseaseFn, ...props }) => {
  // console.log(checkedItems[item.name])
  return (
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.data.length > 0 ? (
          props.data.map(item => {
            let activeClass = !item.selected ? "primary" : "secondary";

            return (
              <tr key={item.id}>
                <td>{item.name}</td>

                <td id={item.id}>
                  <div className="custom-control custom-checkbox mb-3 col-12">
                    <input
                      className="custom-control-input custom-check"
                      type="checkbox"
                      checked={item.selected}
                      key={`chk-${item.id}`}
                      id={`chk-${item.id}`}
                      disabled={true}
                    />
                    <label
                      className="custom-control-label"
                      for={`chk-${item.id}`}
                    ></label>
                  </div>

                  {/* <input type="checkbox" name={item.id} value={item} onChange={selectDiseaseFn(item)} checked={item.selected}/>  */}
                </td>
                <td>
                  <button
                    onClick={selectDiseaseFn(item)}
                    className={`btn btn-${activeClass} btn-sm`}
                  >
                    {item.selected ? "De-Activate" : "Activate"}
                  </button>
                  <button
                    onClick={() => {
                      props.editRow(item);
                    }}
                    style={{ marginLeft: "15px" }}
                    className="btn btn-secondary btn-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      props.showSymptoms(item);
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ marginLeft: "10px" }}
                  >
                    Symptoms
                  </button>
                  <button
                    onClick={() => props.delete(item.id)}
                    className="btn btn-primary btn-sm"
                    style={{ marginLeft: "15px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={3}>No data</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DiseaseTable;
