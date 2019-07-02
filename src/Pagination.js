import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { makeStyles } from '@material-ui/core/styles';

function styles(){

}

export default class Pagination extends React.Component{
  constructor(){
    super();
    this.state = {
      users: [],
      total: null,
      per_page: null,
      current_page: null,
      total_pages: null
    }
    //this.httpRequestWithPage = this.httpRequestWithPage.bind(this);
  }

  httpRequestWithPage = async page_number => {
    if(this.state.total_pages == null || (page_number>0 && page_number <= this.state.total_pages)){
      let response = await axios(`https://reqres.in/api/users?page=${page_number}`);
      response =  response.data;

      this.setState({
        users: response.data,
        total: response.total,
        per_page: response.per_page,
        current_page: response.page,
        total_pages: response.total_pages
      })
    }
  }

  componentWillMount(){
    this.httpRequestWithPage(1);
  }

  render(){
    const pageNumbers = [];
    for(var i=1;i<=this.state.total_pages;i++) pageNumbers.push(i);

    let renderPageNumbers = pageNumbers.map(number => {
      //let active = (this.state.current_page === number) ? "primary" : "";
      return(
        <Button onClick={()=>this.httpRequestWithPage(number)}>{number}</Button>
      );
    })
    

    return(
      <div>
        <h1>Pagination</h1>
          <Table className="table">
              <TableHead>
                  <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>FirstName</TableCell>
                      <TableCell>LastName</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {this.state.users.map(user => (
                    <TableRow>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.first_name}</TableCell>
                      <TableCell>{user.last_name}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
          </Table>
        
        <div className="pagination">
          <ButtonGroup size="small" aria-label="Small outlined button group">
            <Button onClick={this.httpRequestWithPage.bind(this,this.state.current_page-1)}><i class="material-icons">keyboard_arrow_left</i></Button>
            {renderPageNumbers}
            <Button onClick={this.httpRequestWithPage.bind(this,this.state.current_page+1)}><i class="material-icons">keyboard_arrow_right</i></Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}
