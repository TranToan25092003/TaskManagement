interface pagination {
  currentPage: number;
  limit: number;
  quantityPage?: number;
}

const pagination = (
  paginationObj: pagination,
  query: Record<string, any>,
  countDocument: number
): pagination => {
  //#pagination
  // input req.query and import productmodel
  // output retunr pagination Obj

  let pageNo: number = query.page;

  // limit

  if (query.limit) {
    let limit = query.limit;
    if (limit && isFinite(limit)) {
      limit = parseInt(limit);
      if (limit <= 0) {
        return;
      }
      paginationObj.limit = limit;
    } else {
      paginationObj.limit = 20;
    }
  }

  paginationObj.quantityPage = Math.ceil(countDocument / paginationObj.limit);

  //# check pageno was send or validation
  if (pageNo && isFinite(pageNo)) {
    if (pageNo <= 0 || pageNo > paginationObj.quantityPage) {
      return;
    }
    paginationObj.currentPage = pageNo;
  }

  return paginationObj;
  //# end pagnitation
};

export default pagination;
