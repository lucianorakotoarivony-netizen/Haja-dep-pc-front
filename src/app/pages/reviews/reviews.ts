import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core';
import { Auth } from '../../services/auth';
import { Data } from '../../services/data';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Review } from '../../../models/sites.models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReviewStatusPipe } from '../../../pipes/status.pipe';
@Component({
  selector: 'app-reviews',
  imports: [RouterLink, DatePipe, ReviewStatusPipe],
  templateUrl: './reviews.html',
  styleUrl: './reviews.scss',
})
export class Reviews implements OnInit{
  public dataService = inject(Data);
  public auth = inject(Auth);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  newContent = signal<string>('');
  newRating = signal<number>(5);
  errorStatus = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  loading = signal<boolean>(false);
  route = inject(ActivatedRoute);
  success = signal<string | null>(null);
  editingReview = signal<number | null>(null);
  editingContent = signal<string>('');
  editingRating = signal<number>(5);

  startEdit(review: Review):void{
    this.editingReview.set(review.id);
    this.editingContent.set(review.content);
    this.editingRating.set(review.rating);
  }

  cancelEdit(): void{
    this.editingReview.set(null);
    this.editingContent.set('');
    this.editingRating.set(5);
  }

  submitEdit(id: number): void {
    this.loading.set(true);
    this.errorStatus.set(false);
    this.dataService.updateReview(id, this.editingContent(), this.editingRating()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: ()=> {
        this.cancelEdit();
        this.loading.set(false);
        this.dataService.loadReviewData();
      },
      error:(err)=> {
        this.errorStatus.set(true);
        let message = 'Une erreur est survenue. Veuillez réessayer.'
        if(err?.error && typeof err.error.message === "string"){
          message = err.error.message
        }
        this.errorMessage.set(message);
        this.loading.set(false);
      }
    })
  }

  ngOnInit(): void {
    this.dataService.loadReviewData();
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params=> {
      if (params.get('connected') === 'true'){
        this.success.set("Connexion réussi. Vous pouvez maintenant laisser un avis");
        this.router.navigate([], {queryParams:{}});
        setTimeout(()=> {
        this.success.set(null);
      }, 2000)
      }
    });

  }
  submitReview(): void {
    if (!this.newContent()) return;
    this.loading.set(true);
    this.errorMessage.set(null);
    this.errorStatus.set(false);

    this.dataService.createReview(this.newContent(), this.newRating()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next:() => {
        this.newContent.set("");
        this.newRating.set(5);
        this.loading.set(false);
        this.dataService.loadReviewData();
      },
      error:(err) => {
        this.errorStatus.set(true);
        let message = 'Une erreur est survenue. Veuillez réessayer.';
        if (err?.error && typeof err.error.message === "string"){
          message = err.error.message;
        }
        this.errorMessage.set(message);
        
        this.loading.set(false);
      }
    });
  }
  deleteReview(id: number):void{
    this.errorStatus.set(false);
    this.dataService.deleteReview(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next:() => this.dataService.loadReviewData(),
      error:(err) => {
        this.errorStatus.set(true);
        let message = "Une erreur est survenue. Veuillez réessayer.";
        if (err?.error && typeof err.error.message === "string"){
          message = err.error.message;
        }
        this.errorMessage.set(message);
      }
    });
  }
}
