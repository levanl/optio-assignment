import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleOption, UserInfo } from '../interfaces/user.interface';
import { ApiListResponse } from '../interfaces/response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private auth_token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImludGVybnNoaXBAb3B0aW8uYWkiLCJzdWIiOiIzOTg3NjY3MzE3MzQ4OTgzIiwiaWF0IjoxNjczNTI3NzMyLCJleHAiOjE2NzUyNTU3MzJ9.ss2VWdlLDTJYa2rOXfffwnaMJIIeEB7DwkSVsl8xcTjheFu8ATS4eoCtzP5lDYRxQSaG7JXi8FhCRFivMSkSgg'
  private baseUrl = 'https://development.api.optio.ai/api/v2/';

  constructor(
    private httpClient: HttpClient
  ) { }

  getApiUsers(bodyParam: { pageIndex: number, pageSize: number, search?: string }): Observable<ApiListResponse<UserInfo>> {

    const url = `${this.baseUrl}admin/users/find`
    const body = {
      "search": "",
      "sortBy": "email",
      "sortDirection": "asc",
      ...bodyParam,
    };

    return this.httpClient.post<ApiListResponse<UserInfo>>(
      url,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.auth_token}`
        }
      }
    )
  }

  getUserRoles(): Observable<ApiListResponse<RoleOption>> {
    const url = `${this.baseUrl}reference-data/find`;
    const body = {
      "typeId": 4,
      "sortBy": "name",
      "sortDirection": "asc",
      "pageIndex": 0,
      "pageSize": 50,
      "includes": [
        "code", "name"
      ]
    }

    return this.httpClient.post<ApiListResponse<RoleOption>>(
      url,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.auth_token}`
        }
      }
    )
  }

  addUser(user: UserInfo): Observable<any> {
    const url = `${this.baseUrl}admin/users/save`;

    return this.httpClient.post<any>(
      url,
      user,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.auth_token}`
        }
      }
    )
  }

  deleteUser(id: string): Observable<any> {
    const url = `${this.baseUrl}admin/users/remove`;

    return this.httpClient.post<any>(
      url,
      {
        id
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.auth_token}`
        }
      }
    )
  }
}