<ReactTable
            data={polls}
            columns={[
              {
                Header: "Poll Name",
                columns: [
                  {
                    Header: "Poll Name",
                    accessor: "firstName"
                  },
                  {
                    Header: "Poll Name",
                    id: "lastName",
                    accessor: d => d.lastName,
                    width: 170
                  }
                ]
              },
              {
                Header: "Info",
                columns: [
                  {
                    Header: "Age",
                    accessor: "age"
                  }
                ]
              }
            ]}
            pivotBy={["lastName"]}
            filterable
            defaultPageSize={10}
            className="-striped -highlight"
            // Controlled props
            sorted={this.state.sorted}
            page={this.state.page}
            pageSize={this.state.pageSize}
            expanded={this.state.expanded}
            resized={this.state.resized}
            filtered={this.state.filtered}
            // Callbacks
            onSortedChange={sorted => this.setState({ sorted })}
            onPageChange={page => this.setState({ page })}
            onPageSizeChange={(pageSize, page) =>
              this.setState({ page, pageSize })}
            onExpandedChange={expanded => this.setState({ expanded })}
            onResizedChange={resized => this.setState({ resized })}
            onFilteredChange={filtered => this.setState({ filtered })}
          />

          <ReactTable
            data={polls}
            columns={[
              {
                Header: "Poll Name",
                columns: [
                  {
                    Header: "First Poll Name",
                    accessor: "firstName"
                  },
                  {
                    Header: "Last Poll Name",
                    id: "lastName",
                    accessor: d => d.lastName,
                    width: 170
                  }
                ]
              },
              {
                Header: "Info",
                columns: [
                  {
                    Header: "Age",
                    accessor: "age"
                  }
                ]
              }
            ]}
            pivotBy={["lastName"]}
            filterable
            defaultPageSize={10}
            className="-striped -highlight"
            // Controlled props
            sorted={this.state.sorted}
            page={this.state.page}
            pageSize={this.state.pageSize}
            expanded={this.state.expanded}
            resized={this.state.resized}
            filtered={this.state.filtered}
            // Callbacks
            onSortedChange={sorted => this.setState({ sorted })}
            onPageChange={page => this.setState({ page })}
            onPageSizeChange={(pageSize, page) =>
              this.setState({ page, pageSize })}
            onExpandedChange={expanded => this.setState({ expanded })}
            onResizedChange={resized => this.setState({ resized })}
            onFilteredChange={filtered => this.setState({ filtered })}
          />;