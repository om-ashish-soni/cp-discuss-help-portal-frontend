import NavBar from './header';
import ListGroup from 'react-bootstrap/ListGroup';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

function HomePage() {
    var _articles = `Follow the steps below to solve the given problem. 

    Initialize a temporary array(temp[n]) of length same as the original array
    Initialize an integer(k) to keep a track of the current index
    Store the elements from the position d to n-1 in the temporary array
    Now, store 0 to d-1 elements of the original array in the temporary array
    Lastly, copy back the temporary array to the original array
    Below is the implementation of the above approach : 
    
    
    #include <bits/stdc++.h>
    using namespace std;
     
    // Function to rotate array
    void Rotate(int arr[], int d, int n)
    {
        // Storing rotated version of array
        int temp[n];
     
        // Keeping track of the current index
        // of temp[]
        int k = 0;
     
        // Storing the n - d elements of
        // array arr[] to the front of temp[]
        for (int i = d; i < n; i++) {
            temp[k] = arr[i];
            k++;
        }
     
        // Storing the first d elements of array arr[]
        //  into temp
        for (int i = 0; i < d; i++) {
            temp[k] = arr[i];
            k++;
        }
     
        // Copying the elements of temp[] in arr[]
        // to get the final rotated array
        for (int i = 0; i < n; i++) {
            arr[i] = temp[i];
        }
    }
     
    // Function to print elements of array
    void PrintTheArray(int arr[], int n)
    {
        for (int i = 0; i < n; i++) {
            cout << arr[i] << " ";
        }
    }
     
    // Driver code
    int main()
    {
        int arr[] = { 1, 2, 3, 4, 5, 6, 7 };
        int N = sizeof(arr) / sizeof(arr[0]);
        int d = 2;
     
        // Function calling
        Rotate(arr, d, N);
        PrintTheArray(arr, N);
     
        return 0;
    }
    Output
    3 4 5 6 7 1 2 
    Time complexity: O(N) 
    Auxiliary Space: O(N)
    
    Approach 2 (Rotate one by one): This problem can be solved using the below idea:
    
    At each iteration, shift the elements by one position to the left circularly (i.e., first element becomes the last).
    Perform this operation d times to rotate the elements to the left by d position.
    Illustration:
    
    Let us take arr[] = [1, 2, 3, 4, 5, 6, 7], d = 2.
    
    First Step:
            => Rotate to left by one position.
            => arr[] = {2, 3, 4, 5, 6, 7, 1}
    
    Second Step:
            => Rotate again to left by one position
            => arr[] = {3, 4, 5, 6, 7, 1, 2}
    
    Rotation is done by 2 times.
    So the array becomes arr[] = {3, 4, 5, 6, 7, 1, 2}
    
    Follow the steps below to solve the given problem.
    
    Rotate the array to left by one position. For that do the following:
    Store the first element of the array in a temporary variable.
    Shift the rest of the elements in the original array by one place.
    Update the last index of the array with the temporary variable.
    Repeat the above steps for the number of left rotations required.
    Below is the implementation of the above approach:
    
    
    // C++ program to rotate an array by
    // d elements
    #include <bits/stdc++.h>
    using namespace std;
     
    /*Function to left rotate arr[] of size n by d*/
    void Rotate(int arr[], int d, int n)
    {
        int p = 1;
        while (p <= d) {
            int last = arr[0];
            for (int i = 0; i < n - 1; i++) {
                arr[i] = arr[i + 1];
            }
            arr[n - 1] = last;
            p++;
        }
    }
     
    // Function to print an array
    void printArray(int arr[], int size)
    {
        for (int i = 0; i < size; i++)
            cout << arr[i] << " ";
    }
     
    // Driver code
    int main()
    {
        int arr[] = { 1, 2, 3, 4, 5, 6, 7 };
        int N = sizeof(arr) / sizeof(arr[0]);
        int d = 2;
       
        // Function calling
        Rotate(arr, d, N);
        printArray(arr, N);
     
        return 0;
    }
    Output
    3 4 5 6 7 1 2 
    Time Complexity: O(N * d)
    Auxiliary Space: O(1)
    
    Approach 3 (A Juggling Algorithm): This is an extension of method 2. 
    
    Instead of moving one by one, divide the array into different sets where the number of sets is equal to the GCD of N and d (say X. So the elements which are X distance apart are part of a set) and rotate the elements within sets by 1 position to the left. 
    
    Calculate the GCD between the length and the distance to be moved.
    The elements are only shifted within the sets.
    We start with temp = arr[0] and keep moving arr[I+d] to arr[I] and finally store temp at the right place.`;
    // var divStyle={
    //     width:"60%",
    //     height:"100%",
    //     margin:"auto",
    //     display:"flex",
    // }
    return (
        <div className="container w-60">
            <h1>Article header</h1>
            <spam><h6>Difficulty level: medium</h6><h6>Created at: 00/00/0000</h6></spam>
            {_articles}
            <div className="container w-60">
                <h5 className='pull-left'>Views: 100</h5>
            <Box  component="span" sx={{ p: 2, border: '1px dashed grey' }}>
            <Tooltip title="Like">
                    <Badge badgeContent={4} color="primary">
                        <FavoriteBorderIcon />
                    </Badge>
                </Tooltip>
            </Box>
            </div>
            <h4>Contributed by:</h4>
            <h3>xyz</h3>
            <h4>Difficulty level:</h4>
            <ListGroup horizontal>
                <ListGroup.Item>Easy</ListGroup.Item>
                <ListGroup.Item>Normal</ListGroup.Item>
                <ListGroup.Item>Medium</ListGroup.Item>
                <ListGroup.Item>Hard</ListGroup.Item>
                <ListGroup.Item>Expert</ListGroup.Item>
            </ListGroup>
        </div>
        // <NavBar username="abc"/>
    )
}
export default HomePage;