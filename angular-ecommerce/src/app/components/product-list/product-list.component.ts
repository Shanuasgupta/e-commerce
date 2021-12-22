import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: any[];
  currentCategoryid :number;
  constructor(private productService : ProductService ,private route:ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{ 
      this.listProducts();
    });
  }

  listProducts() {

    const hasCategoryId: boolean =this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){

      this.currentCategoryid = +this.route.snapshot.paramMap.get('id');
    } else{
      this.currentCategoryid = 1;

    }
    this.productService.getProductList(this.currentCategoryid).subscribe(
      data => {
        this.products = data;
      }
        
    );

  }
}
